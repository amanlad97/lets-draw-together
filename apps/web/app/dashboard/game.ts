import { getExistingShapes } from "./https";

type Shape = { x: number; y: number; width: number; height: number };

export class game {
  private existingShapes: Shape[];
  private startX: number = 0;
  private startY: number = 0;
  private isDrawing: boolean;
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private roomId: number;
  socket: WebSocket;
  private shape: "circle" | "rect" | "pen" = "circle";
  private normalizeShape(shape: Shape): Shape {
    let { x, y, width, height } = shape;

    if (width < 0) {
      x += width;
      width = Math.abs(width);
    }
    if (height < 0) {
      y += height;
      height = Math.abs(height);
    }

    return { x, y, width, height };
  }
  private sendShape = (ws: WebSocket, shape: Shape) => {
    const message = JSON.stringify({
      type: "chat",
      roomId: this.roomId,
      message: JSON.stringify(shape),
    });
    ws.send(message);
  };

  selectShape(shape: "circle" | "rect" | "pen") {
    this.shape = shape;
  }

  constructor(canvas: HTMLCanvasElement, roomId: number, ws: WebSocket) {
    this.canvas = canvas;
    this.existingShapes = [];
    this.ctx = canvas.getContext("2d")!;
    this.roomId = roomId;
    this.socket = ws;
    this.isDrawing = false;
    this.init();
    this.initHandler();
    this.initMouseHandlers();
  }
  async init() {
    this.existingShapes = await getExistingShapes(this.roomId);
  }
  initMouseHandlers() {
    this.canvas.addEventListener("mousedown", this.mousedown);
    this.canvas.addEventListener("mouseup", this.mouseup);
    this.canvas.addEventListener("mousemove", this.mousemove);
  }
  initHandler() {
    this.socket.onmessage = (event: MessageEvent) => {
      try {
        console.log("message delivered");
        const data = JSON.parse(event.data);
        if (data.type === "chat" && data.message) {
          const shape: Shape = this.normalizeShape(JSON.parse(data.message));
          this.existingShapes.push(shape);
          this.renderAllShapes();
        }
      } catch (err) {
        console.error("Error parsing WS message:", err);
      }
    };
  }
  renderAllShapes = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "white";
    this.existingShapes.forEach((r) => {
      this.ctx.strokeRect(r.x, r.y, r.width, r.height);
    });
  };
  mousedown = (event: MouseEvent) => {
    const rect = this.canvas.getBoundingClientRect();
    this.isDrawing = true;
    this.startX = event.clientX - rect.left;
    this.startY = event.clientY - rect.top;
  };

  mousemove = (event: MouseEvent) => {
    if (this.isDrawing) {
      const width = event.clientX - this.startX;
      const height = event.clientY - this.startY;
      this.renderAllShapes();
      this.ctx.strokeRect(this.startX, this.startY, width, height);
    }
  };

  mouseup = (event: MouseEvent) => {
    if (this.isDrawing) {
      const rawShape: Shape = {
        x: this.startX,
        y: this.startY,
        width: event.clientX - this.startX,
        height: event.clientY - this.startY,
      };
      const shape = this.normalizeShape(rawShape);
      this.sendShape(this.socket, shape);
      this.existingShapes.push(shape);
      this.isDrawing = false;
      this.renderAllShapes();
    }
  };
}
