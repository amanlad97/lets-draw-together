export class game {
  //   private startX: number;
  //   private startY: number;
  private isDrawing: boolean;
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private roomId: string;
  //   private shape: "circle" | "rect" | "pen";
  socket: WebSocket;

  constructor(canvas: HTMLCanvasElement, roomId: string, ws: WebSocket) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.roomId = roomId;
    this.socket = ws;
    this.isDrawing = false;
  }
  //   init() {
  //     (this.roomId);
  //   }
}
