export const draw = (canvas: HTMLCanvasElement): void => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.background = "black";

  const final: { x: number; y: number; width: number; height: number }[] = [];
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  let isclicked = false;
  let x = 0;
  let y = 0;
  const mousedown = (event: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    isclicked = true;
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
  };
  const mousemove = (event: MouseEvent) => {
    if (isclicked) {
      const width = event.clientX - x;
      const height = event.clientY - y;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "white";
      ctx.strokeRect(x, y, width, height);
      final.forEach((r) => {
        ctx.strokeRect(r.x, r.y, r.width, r.height);
      });
    }
  };
  const mouseup = (event: MouseEvent) => {
    if (isclicked) {
      final.push({
        x,
        y,
        width: event.clientX - x,
        height: event.clientY - y,
      });
      isclicked = false;
    }
  };
  canvas.addEventListener("mousedown", mousedown);
  canvas.addEventListener("mouseup", mouseup);
  canvas.addEventListener("mousemove", mousemove);
};
