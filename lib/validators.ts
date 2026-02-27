import { z } from "zod";

export const contributionSchema = z.object({
  texteOriginal: z.string().min(3).max(2000),
  traductionLitterale: z.string().min(3).max(2000),
  explication: z.string().min(10).max(5000),
  contexteUsage: z.string().max(2000).optional(),
  source: z.string().max(500).optional(),
  langueId: z.string().cuid(),
});

export const profileSchema = z.object({
  name: z.string().min(2).max(100),
  bio: z.string().max(500).optional(),
  preferredLangueId: z.string().cuid().optional(),
  dailyEmailEnabled: z.boolean(),
});

export const origineSchema = z.object({
  paysId: z.string().cuid(),
  ethnieId: z.string().cuid().optional(),
  langueId: z.string().cuid().optional(),
});

export type ContributionInput = z.infer<typeof contributionSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type OrigineInput = z.infer<typeof origineSchema>;
