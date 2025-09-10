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
      startX: number;
      startY: number;
      endX: number;
      endY: number;
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
        console.error("Errorrrrrrrrr WS message:", err);
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
    this.ctx.fillStyle = "rgba(0, 0, 0)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.existingShapes.map((shape) => {
      if (shape.type === "rect") {
        this.ctx.strokeStyle = "white";
        this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      } else if (shape.type === "circle") {
        console.log(shape);
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
      }
    });
  };

  private mousedown = (event: MouseEvent) => {
    const rect = this.canvas.getBoundingClientRect();
    this.isDrawing = true;
    this.startX = event.clientX - rect.left;
    this.startY = event.clientY - rect.top;
  };

  private mousemove = (event: MouseEvent) => {
    if (this.isDrawing) {
      const width = event.clientX - this.startX;
      const height = event.clientY - this.startY;
      this.clear();
      this.ctx.strokeStyle = "white)";
      const selectedTool = this.shape;
      console.log(selectedTool);
      if (selectedTool === "rect") {
        this.ctx.strokeRect(this.startX, this.startY, width, height);
      } else if (selectedTool === "circle") {
        const radius = Math.max(width, height) / 2;
        const centerX = this.startX + radius;
        const centerY = this.startY + radius;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, Math.abs(radius), 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.closePath();
      }
    }
  };

  private mouseup = (event: MouseEvent) => {
    this.isDrawing = false;
    const width = event.clientX - this.startX;
    const height = event.clientY - this.startY;

    const selectedTool = this.shape;
    let shape: Shape | null = null;
    if (selectedTool === "rect") {
      shape = {
        type: "rect",
        x: this.startX,
        y: this.startY,
        height,
        width,
      };
    } else if (selectedTool === "circle") {
      const radius = Math.max(width, height) / 2;
      shape = {
        type: "circle",
        radius: radius,
        centerX: this.startX + radius,
        centerY: this.startY + radius,
      };
    }

    if (!shape) {
      return;
    }

    this.existingShapes.push(shape);

    this.socket.send(
      JSON.stringify({
        type: "chat",
        message: JSON.stringify({
          shape,
        }),
        roomId: this.roomId,
      })
    );
  };

  private initMouseHandlers() {
    this.canvas.addEventListener("mousedown", this.mousedown);
    this.canvas.addEventListener("mouseup", this.mouseup);
    this.canvas.addEventListener("mousemove", this.mousemove);
  }
}
