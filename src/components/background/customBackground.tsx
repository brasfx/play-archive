import { motion, Variants } from 'framer-motion';

const draw: Variants = {};

const shape: React.CSSProperties = {
  strokeWidth: 10,
  strokeLinecap: 'round',
  fill: 'transparent',
  opacity: 0.2,
};

export default function GamerBackground() {
  const rows = 3; // ajuste conforme resolução
  const cols = 8;
  const cellWidth = 600;
  const cellHeight = 600;

  // Função que renderiza todos os formatos em cada posição-base
  const renderCellShapes = (
    offsetX: number,
    offsetY: number,
    baseCustom: number = 0,
  ) => (
    <>
      <motion.circle
        className="circle-path"
        cx={offsetX + 100}
        cy={offsetY + 100}
        r="80"
        stroke="#ff0088"
        variants={draw}
        custom={baseCustom + 1}
        style={shape}
      />
      <motion.line
        x1={offsetX + 220}
        y1={offsetY + 30}
        x2={offsetX + 360}
        y2={offsetY + 170}
        stroke="#8df0cc"
        variants={draw}
        custom={baseCustom + 2}
        style={shape}
      />

      <motion.line
        x1={offsetX + 220}
        y1={offsetY + 170}
        x2={offsetX + 360}
        y2={offsetY + 30}
        stroke="#8df0cc"
        variants={draw}
        custom={baseCustom + 2.5}
        style={shape}
      />
      <motion.rect
        width="140"
        height="140"
        x={offsetX + 410}
        y={offsetY + 30}
        rx="20"
        stroke="#0d63f8"
        variants={draw}
        custom={baseCustom + 3}
        style={shape}
      />
      <motion.circle
        cx={offsetX + 100}
        cy={offsetY + 300}
        r="80"
        stroke="#0d63f8"
        variants={draw}
        custom={baseCustom + 2}
        style={shape}
      />
      <motion.line
        x1={offsetX + 220}
        y1={offsetY + 230}
        x2={offsetX + 360}
        y2={offsetY + 370}
        stroke="#ff0088"
        custom={baseCustom + 3}
        variants={draw}
        style={shape}
      />
      <motion.line
        x1={offsetX + 220}
        y1={offsetY + 370}
        x2={offsetX + 360}
        y2={offsetY + 230}
        stroke="#ff0088"
        custom={baseCustom + 3.5}
        variants={draw}
        style={shape}
      />
      <motion.rect
        width="140"
        height="140"
        x={offsetX + 410}
        y={offsetY + 230}
        rx="20"
        stroke="#8df0cc"
        custom={baseCustom + 4}
        variants={draw}
        style={shape}
      />
      <motion.circle
        cx={offsetX + 100}
        cy={offsetY + 500}
        r="80"
        stroke="#8df0cc"
        variants={draw}
        custom={baseCustom + 3}
        style={shape}
      />
      <motion.line
        x1={offsetX + 220}
        y1={offsetY + 430}
        x2={offsetX + 360}
        y2={offsetY + 570}
        stroke="#0d63f8"
        variants={draw}
        custom={baseCustom + 4}
        style={shape}
      />
      <motion.line
        x1={offsetX + 220}
        y1={offsetY + 570}
        x2={offsetX + 360}
        y2={offsetY + 430}
        stroke="#0d63f8"
        variants={draw}
        custom={baseCustom + 4.5}
        style={shape}
      />
      <motion.rect
        width="140"
        height="140"
        x={offsetX + 410}
        y={offsetY + 430}
        rx="20"
        stroke="#ff0088"
        variants={draw}
        custom={baseCustom + 5}
        style={shape}
      />
    </>
  );

  // Monta todas as células do grid
  let elements = [];
  let customBase = 0;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const offsetX = col * cellWidth;
      const offsetY = row * cellHeight;
      elements.push(renderCellShapes(offsetX, offsetY, customBase));
      customBase += 12; // para variar custom
    }
  }

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ overflow: 'hidden', width: '100vw', height: '100vh' }}
    >
      <motion.svg
        width="100vw"
        height="100vh"
        viewBox={`0 0 ${cols * cellWidth} ${rows * cellHeight}`}
        initial="hidden"
        animate="visible"
        style={{ width: '100vw', height: '100vh', display: 'block' }}
      >
        {elements}
      </motion.svg>
    </div>
  );
}
