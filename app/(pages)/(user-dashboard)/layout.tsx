import NavComponent from "@/components/NavComponent";

export default function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div><NavComponent/>{children}</div>
  )
}
