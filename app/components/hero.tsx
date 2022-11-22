import justin from "~/assets/img/Justin-Street.jpeg";

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center gap-12 md:w-full md:flex-row md:justify-around">
      <img className="max-w-xs rounded-full md:order-2" src={justin} />
      <div className="flex flex-col justify-center">
        <h1>These are the times</h1>
      </div>
    </div>
  );
}
