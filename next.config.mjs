/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pravi statičan sajt u folderu "out" (može na bilo koji hosting). Na Vercelu radi i bez ovoga.
  output: 'export',
  images: { unoptimized: true },
};
export default nextConfig;
