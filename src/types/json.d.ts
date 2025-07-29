declare module "*.json" {
  const value: unknown;
  export default value;
}

declare module "@/data/*.json" {
  const value: unknown;
  export default value;
}
