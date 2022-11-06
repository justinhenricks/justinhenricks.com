import justin from "~/assets/img/Justin-Street.jpeg";

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center gap-12 md:w-full md:flex-row md:justify-around">
      <img className=" max-w-xs rounded-full md:order-2" src={justin} />
      <div className="flex flex-col justify-center">
        <div className="text-5xl">Hiiiiii</div>
        <div className="text-2xl">These are the times</div>
      </div>
    </div>
  );
}
