import { getExistingShapes } from "./https";

type Shape =
  | {
      type: "rectangle";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
    }
  | {
      type: "pencil";
      points: { x: number; y: number }[];
    };

type ShapeType = "circle" | "rectangle" | "pencil";

export class Game {
  private existingShapes: Shape[] = [];
  private startX: number = 0;
  private startY: number = 0;
  private isDrawing: boolean = false;
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private roomId: number;
  private socket: WebSocket;
  shape: ShapeType = "circle";
  private pencilPoints: { x: number; y: number }[] = [];

  constructor(canvas: HTMLCanvasElement, roomId: number, ws: WebSocket) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.roomId = roomId;
    this.socket = ws;
    this.init();
    this.initHandler();
    this.initMouseHandlers();
    this.clear();
  }

  destroy() {
    this.canvas.removeEventListener("mousedown", this.mousedown);
    this.canvas.removeEventListener("mouseup", this.mouseup);
    this.canvas.removeEventListener("mousemove", this.mousemove);
  }

  private async init() {
    try {
      this.existingShapes = await getExistingShapes(this.roomId);
      console.log(this.existingShapes);
      this.clear();
    } catch (error) {
      console.error("Failed to load existing shapes:", error);
    }
  }

  private initHandler() {
    this.socket.onmessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "chat" && data.message) {
          const shape: Shape = JSON.parse(data.message);
          this.existingShapes.push(shape);
          this.clear();
        }
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    };
  }

  selectShape(shape: ShapeType) {
    this.shape = shape;
  }

  private sendShape(shape: Shape) {
    if (this.socket.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        type: "chat",
        roomId: this.roomId,
        message: JSON.stringify(shape),
      });
      this.socket.send(message);
    }
  }

  private clear = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    console.log(this.existingShapes);
    this.existingShapes.forEach((shape) => {
      this.ctx.strokeStyle = "#ffffff";
      this.ctx.lineWidth = 2;

      if (shape.type === "rectangle") {
        this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      } else if (shape.type === "circle") {
        this.ctx.beginPath();
        this.ctx.arc(
          shape.centerX,
          shape.centerY,
          Math.abs(shape.radius),
          0,
          Math.PI * 2
        );
        this.ctx.stroke();
        this.ctx.closePath();
      } else if (shape.type === "pencil") {
        this.ctx.beginPath();
        const [firstPoint, ...restPoints] = shape.points;
        if (firstPoint) {
          this.ctx.moveTo(firstPoint.x, firstPoint.y);
          restPoints.forEach((point) => {
            this.ctx.lineTo(point.x, point.y);
          });
          this.ctx.stroke();
        }
        this.ctx.closePath();
      }
    });
  };

  private getMousePos(event: MouseEvent) {
    const rectangle = this.canvas.getBoundingClientRect();
    return {
      x: event.clientX - rectangle.left,
      y: event.clientY - rectangle.top,
    };
  }

  private mousedown = (event: MouseEvent) => {
    const pos = this.getMousePos(event);
    this.isDrawing = true;
    this.startX = pos.x;
    this.startY = pos.y;

    if (this.shape === "pencil") {
      this.pencilPoints = [{ x: this.startX, y: this.startY }];
    }
  };

  private mousemove = (event: MouseEvent) => {
    if (!this.isDrawing) return;

    const pos = this.getMousePos(event);
    const width = pos.x - this.startX;
    const height = pos.y - this.startY;

    this.clear();
    this.ctx.strokeStyle = "#ffffff";
    this.ctx.lineWidth = 2;

    if (this.shape === "rectangle") {
      this.ctx.strokeRect(this.startX, this.startY, width, height);
    } else if (this.shape === "circle") {
      const radius = Math.sqrt(width * width + height * height) / 2;
      const centerX = this.startX + width / 2;
      const centerY = this.startY + height / 2;
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, Math.abs(radius), 0, Math.PI * 2);
      this.ctx.stroke();
      this.ctx.closePath();
    } else if (this.shape === "pencil") {
      this.pencilPoints.push({ x: pos.x, y: pos.y });
      this.ctx.beginPath();
      const [firstPoint, ...restPoints] = this.pencilPoints;
      if (firstPoint) {
        this.ctx.moveTo(firstPoint.x, firstPoint.y);
        restPoints.forEach((point) => {
          this.ctx.lineTo(point.x, point.y);
        });
        this.ctx.stroke();
      }
      this.ctx.closePath();
    }
  };

  private mouseup = (event: MouseEvent) => {
    if (!this.isDrawing) return;

    this.isDrawing = false;
    const pos = this.getMousePos(event);
    const width = pos.x - this.startX;
    const height = pos.y - this.startY;

    let shape: Shape | null = null;

    if (this.shape === "rectangle") {
      shape = {
        type: "rectangle",
        x: this.startX,
        y: this.startY,
        width,
        height,
      };
    } else if (this.shape === "circle") {
      const radius = Math.sqrt(width * width + height * height) / 2;
      shape = {
        type: "circle",
        centerX: this.startX + width / 2,
        centerY: this.startY + height / 2,
        radius,
      };
    } else if (this.shape === "pencil" && this.pencilPoints.length > 1) {
      shape = {
        type: "pencil",
        points: this.pencilPoints,
      };
    }

    if (shape) {
      this.existingShapes.push(shape);
      this.sendShape(shape);
      this.clear();
    }
  };

  private initMouseHandlers() {
    this.canvas.addEventListener("mousedown", this.mousedown);
    this.canvas.addEventListener("mouseup", this.mouseup);
    this.canvas.addEventListener("mousemove", this.mousemove);
  }
}
