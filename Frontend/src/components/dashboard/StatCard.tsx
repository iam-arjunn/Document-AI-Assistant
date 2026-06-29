import type { Stat } from "../../types";

type Props = {
  stat: Stat;
};

export function StatCard({ stat }: Props) {
  return (
    <article className="stat-card">
      <span>{stat.label}</span>
      <strong>{stat.value}</strong>
      <small>{stat.detail}</small>
    </article>
  );
}
