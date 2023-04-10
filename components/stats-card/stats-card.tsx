interface Props {
  name: string;
  value: any;
}

export function StatsCard(props: Props) {
  return (
    <div className="bg-primary-dark flex items-center justify-center p-2 flex-col grow">
      <b>{props.name}</b>
      <b className="text-lg">{props.value}</b>
    </div>
  );
}
