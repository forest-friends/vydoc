import progress from "cli-progress";

export const makeProgressBar = (
  length: number,
  options: progress.Options = { stopOnComplete: true },
  preset: progress.Preset = progress.Presets.shades_classic
) => {
  const bar = new progress.SingleBar(options, preset);
  bar.start(length, 0);

  return () => bar.increment();
};
