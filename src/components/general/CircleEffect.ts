import $ from 'jquery';


export const initMarkerCircle = () => {
  const markers = $(".marker");
  const widthGain = 1;
  const heightGain = 1.5;

  markers.each(function () {
    const marker = $(this);

    // 🛑 Prevent duplicate SVGs
    if (marker.find('svg').length > 0) return;

    const width = marker.width() || 100;
    const height = 2 * (marker.height() || 20);
    const ns = "http://www.w3.org/2000/svg";

    const svg = document.createElementNS(ns, "svg");
    $(svg)
      .css({
        // height: height,
        transform: `scale(${(3 * widthGain * width) / height}, ${heightGain})`,
        // position: 'relative',
        // left: '-5%',
        // top: '40%',
        // zIndex: -1,
      })
      .attr({
        width: 100,
        height: height,
        viewBox: "-1 -1 2 2"
      });

    marker[0].appendChild(svg);

    const path = document.createElementNS(ns, "path");
    $(path).attr({
      pathLength: 100,
      "vector-effect": "non-scaling-stroke",
      stroke: '#796e68',
      strokeWidth: 1.0,
      fill: 'none',
      strokeLinecap: 'round'
    });
    svg.appendChild(path);

    const pathLength = 1000 * path.getTotalLength();
    $(path)
      .attr({ d: circlePath(-0.15, 0.05, 150, 190, 0.05, 0.3) })
      .attr({
        "stroke-dasharray": pathLength,
        "stroke-dashoffset": pathLength
      });

    // Animate on load
    $(path).css("visibility", "visible").animate({ "stroke-dashoffset": 0 }, 700);
  });

  function circlePath(dr_min: number, dr_max: number, θ0_min: number, θ0_max: number, dθ_min: number, dθ_max: number): string {
    let c = 0.551915024494, β = Math.atan(c), d = Math.sqrt(c * c + 1),
        r = 0.9, θ = ((θ0_min + Math.random() * (θ0_max - θ0_min)) * Math.PI) / 180;
    let path = "M" + [r * Math.sin(θ), r * Math.cos(θ)];
    path += " C" + [d * r * Math.sin(θ + β), d * r * Math.cos(θ + β)];

    for (let i = 0; i < 4; i++) {
      θ += (Math.PI / 2) * (1 + dθ_min + Math.random() * (dθ_max - dθ_min));
      r *= 1 + dr_min + Math.random() * (dr_max - dr_min);
      path += " " + (i ? "S" : "") + [d * r * Math.sin(θ - β), d * r * Math.cos(θ - β)];
      path += " " + [r * Math.sin(θ), r * Math.cos(θ)];
    }
    return path;
  }
};
