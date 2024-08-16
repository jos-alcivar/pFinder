const SvgLogo = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 900 900.04"
    width="1em"
    height="1em"
    {...props}
  >
    <defs>
      <style>
        {
          ".logo_svg__cls-1{fill:#000;stroke-width:0}.logo_svg__cls-5{fill:none;stroke-miterlimit:10;stroke:#999;stroke-width:4px}"
        }
      </style>
    </defs>
    <g id="logo_svg__grid">
      <path
        d="M73.19 0v900M900 68.54H0M289.47 449.54H0M900 449.54H608.53M900 825.54H0M449.5 900.04V645.86M449.5 319.96V.04M824.5.04v900"
        className="logo_svg__cls-5"
      />
    </g>
    <g id="logo_svg__vertex">
      <circle cx={73.19} cy={74.24} r={23.49} className="logo_svg__cls-1" />
      <circle cx={449} cy={74.24} r={23.49} className="logo_svg__cls-1" />
      <circle cx={449} cy={825.85} r={23.49} className="logo_svg__cls-1" />
      <circle cx={824.81} cy={450.04} r={23.49} className="logo_svg__cls-1" />
      <circle cx={824.81} cy={825.85} r={23.49} className="logo_svg__cls-1" />
      <circle cx={73.19} cy={450.04} r={23.49} className="logo_svg__cls-1" />
      <circle cx={73.19} cy={825.85} r={23.49} className="logo_svg__cls-1" />
      <circle cx={824.81} cy={74.24} r={23.49} className="logo_svg__cls-1" />
    </g>
    <g id="logo_svg__person">
      <circle cx={449} cy={444.35} r={38.17} className="logo_svg__cls-1" />
      <path
        d="M509.82 547.85H388.18c6.33-27.75 31.15-48.44 60.82-48.44s54.49 20.7 60.82 48.44"
        className="logo_svg__cls-1"
      />
    </g>
    <g id="logo_svg__lupe">
      <path
        id="logo_svg__handle"
        d="m572.24 612.86 97.17 82.79"
        style={{
          stroke: "#000",
          fill: "none",
          strokeMiterlimit: 10,
          strokeWidth: 40,
        }}
      />
      <path
        id="logo_svg__inner"
        d="M449.5 634.12h-.5c-83.51 0-151.2-67.7-151.2-151.21 0-11.47 1.28-22.63 3.7-33.37 15.19-67.45 75.46-117.83 147.5-117.83h.5c71.82.23 131.85 50.53 147 117.83 2.42 10.74 3.7 21.9 3.7 33.37 0 83.34-67.42 150.94-150.7 151.21Z"
        style={{
          stroke: "#000",
          fill: "none",
          strokeMiterlimit: 10,
          strokeWidth: 5,
        }}
      />
      <path
        id="logo_svg__outter"
        d="M617.26 447.72c-16.21-77.87-85.12-136.42-167.74-136.67h-.53c-82.85 0-152.02 58.63-168.26 136.67a173 173 0 0 0-3.61 35.2c0 94.93 76.95 171.87 171.87 171.87h.53c94.67-.28 171.34-77.12 171.34-171.87 0-12.07-1.24-23.84-3.61-35.2Z"
        style={{
          strokeWidth: 20,
          stroke: "#000",
          fill: "none",
          strokeMiterlimit: 10,
        }}
      />
    </g>
  </svg>
);
export default SvgLogo;
