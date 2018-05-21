import { Palette } from 'node-vibrant/lib/color';

type PaletteSelections = 'Vibrant' | 'Muted' | 'DarkVibrant' | 'DarkMuted' | 'LightVibrant' | 'LightMuted';

export const getRbgFromPalette = (palette: Palette | null, selection: PaletteSelections, alternative: string) => {
  return palette && palette[selection] ? `rgb(${palette[selection]!.getRgb().join(',')})` : alternative;
};
