type Props = {
  title: string;
  value: number;
};

export default function DashboardCard({ title, value }: Props) {
  return (
    <div style={{ border: "1px solid", padding: 10 }}>
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  );
}
