import { getExistingShapes } from "./https";

type Shape =
  | {
      type: "rect";
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

type ShapeType = "circle" | "rect" | "pencil";

export class Game {
  private existingShapes: Shape[] = [];
  private startX: number = 0;
  private startY: number = 0;
  private isDrawing: boolean = false;
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private roomId: number;
  private socket: WebSocket;
  private shape: ShapeType = "circle";
  private pencilPoints: { x: number; y: number }[] = [];

  constructor(canvas: HTMLCanvasElement, roomId: number, ws: WebSocket) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.roomId = roomId;
    this.socket = ws;
    this.init();
    this.initHandler();
    this.initMouseHandlers();
  }

  destroy() {
    this.canvas.removeEventListener("mousedown", this.mousedown);
    this.canvas.removeEventListener("mouseup", this.mouseup);
    this.canvas.removeEventListener("mousemove", this.mousemove);
  }

  private async init() {
    this.existingShapes = await getExistingShapes(this.roomId);
    this.clear(); 
  }

  private initHandler() {
    this.socket.onmessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "chat" && data.message) {
          const shape: Shape = JSON.parse(data.message);
          this.existingShapes.push(shape);
          this.clear(); // Re-render after receiving new shape
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

    this.existingShapes.forEach((shape) => {
      if (shape.type === "rect") {
        this.ctx.strokeStyle = "white";
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
        this.ctx.moveTo(firstPoint?.x || 0, firstPoint?.y || 0);
        restPoints.forEach((point) => {
          this.ctx.lineTo(point.x, point.y);
        });
        this.ctx.stroke();
        this.ctx.closePath();
      }
    });
  };

  private mousedown = (event: MouseEvent) => {
    const rect = this.canvas.getBoundingClientRect();
    this.isDrawing = true;
    this.startX = event.clientX - rect.left;
    this.startY = event.clientY - rect.top;

    if (this.shape === "pencil") {
      this.pencilPoints = [{ x: this.startX, y: this.startY }];
    }
  };

  private mousemove = (event: MouseEvent) => {
    if (this.isDrawing) {
      const width = event.clientX - this.startX;
      const height = event.clientY - this.startY;
      this.clear();

      this.ctx.strokeStyle = "white";
      if (this.shape === "rect") {
        this.ctx.strokeRect(this.startX, this.startY, width, height);
      } else if (this.shape === "circle") {
        const radius = Math.max(width, height) / 2;
        const centerX = this.startX + radius;
        const centerY = this.startY + radius;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, Math.abs(radius), 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.closePath();
      } else if (this.shape === "pencil") {
        this.pencilPoints.push({
          x: event.clientX - this.canvas.getBoundingClientRect().left,
          y: event.clientY - this.canvas.getBoundingClientRect().top,
        });
        this.clear();
      }
    }
  };

  private mouseup = (event: MouseEvent) => {
    this.isDrawing = false;
    const width = event.clientX - this.startX;
    const height = event.clientY - this.startY;

    let shape: Shape | null = null;
    if (this.shape === "rect") {
      shape = {
        type: "rect",
        x: this.startX,
        y: this.startY,
        width,
        height,
      };
    } else if (this.shape === "circle") {
      const radius = Math.max(width, height) / 2;
      shape = {
        type: "circle",
        centerX: this.startX + radius,
        centerY: this.startY + radius,
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
