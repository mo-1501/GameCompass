var Canvas = document.getElementById("canvas");
var ctx = Canvas.getContext("2d");

var resize = function () {
  Canvas.width = Canvas.clientWidth;
  Canvas.height = Canvas.clientHeight;
};
window.addEventListener("resize", resize);
resize();

var elements = [];
var presets = {};

presets.o = function (x, y, s, dx, dy) {
  return {
    x: x,
    y: y,
    r: 12 * s,
    w: 5 * s,
    dx: dx,
    dy: dy,
    draw: function (ctx, t) {
      this.x += this.dx;
      this.y += this.dy;

      ctx.beginPath();
      ctx.arc(this.x + +Math.sin((50 + x + t / 10) / 100) * 3, this.y + +Math.sin((45 + x + t / 10) / 100) * 4, this.r, 0, 2 * Math.PI, false);
      ctx.lineWidth = this.w;
      ctx.strokeStyle = "#DEA8DF";
      ctx.stroke();
    },
  };
};

presets.x = function (x, y, s, dx, dy, dr, r) {
  r = r || 0;
  return {
    x: x,
    y: y,
    s: 20 * s,
    w: 5 * s,
    r: r,
    dx: dx,
    dy: dy,
    dr: dr,
    draw: function (ctx, t) {
      this.x += this.dx;
      this.y += this.dy;
      this.r += this.dr;

      var _this = this;
      var line = function (x, y, tx, ty, c, o) {
        o = o || 0;
        ctx.beginPath();
        ctx.moveTo(-o + (_this.s / 2) * x, o + (_this.s / 2) * y);
        ctx.lineTo(-o + (_this.s / 2) * tx, o + (_this.s / 2) * ty);
        ctx.lineWidth = _this.w;
        ctx.strokeStyle = c;
        ctx.stroke();
      };

      ctx.save();

      ctx.translate(this.x + Math.sin((x + t / 10) / 100) * 5, this.y + Math.sin((10 + x + t / 10) / 100) * 2);
      ctx.rotate((this.r * Math.PI) / 180);

      line(-1, -1, 1, 1, "#88F8FF");
      line(1, -1, -1, 1, "#88F8FF");

      ctx.restore();
    },
  };
};

for (var x = 0; x < Canvas.width; x++) {
  for (var y = 0; y < Canvas.height; y++) {
    if (Math.round(Math.random() * 8000) == 1) {
      var s = (Math.random() * 5 + 1) / 10;
      if (Math.round(Math.random()) == 1) elements.push(presets.o(x, y, s, 0, 0));
      else elements.push(presets.x(x, y, s, 0, 0, (Math.random() * 3 - 1) / 10, Math.random() * 360));
    }
  }
}

setInterval(function () {
  ctx.clearRect(0, 0, Canvas.width, Canvas.height);

  var time = new Date().getTime();
  for (var e in elements) elements[e].draw(ctx, time);
}, 10);
