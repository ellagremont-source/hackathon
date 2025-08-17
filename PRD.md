Boardbreaker – Product Requirements Document

1. Core Objective & Win/Loss Conditions

1.1 Goal

Reach square 49 in the fewest possible turns while surviving the board’s sabotages.

1.2 Win Condition

Land on or pass square 49 through valid movement.

Survive without triggering a “death” condition for your persona type.

1.3 Loss Condition

Triggering the persona-specific "death" mechanic before reaching square 49.

Example: For Sprinter, overshooting finish line 3 times; for Daredevil, landing on 3 traps in a row.

1.4 Scoring System

Primary Score: Completion time in seconds.

Secondary Score Components:

Mini-games won count.

“Strength” score (algorithm weighing completion time, number of challenges passed, and setbacks avoided).

High scores tracked per persona configuration.

1.5 Replay Incentives

Beat personal bests (time and strength score).

Experiment with persona combinations for better synergy.

Increase mini-game win streaks.

2. Game Loop & Player Flow

2.1 High-Level Flow

Opening screen – “Boardbreaker” logo animation.

Leaderboard screen – Shows top scores and personal best.

Press Play to enter customization.

Customization:

Choose skin & cosmetics.

Choose persona settings (3 traits).

Board generated based on persona.

Dice UI appears – roll to determine movement.

Player moves and lands on a square:

Resolve square behavior.

Trigger animations or mini-games as needed.

Continue until win/loss condition met.

End screen:

Recap performance.

Show updated leaderboard.

Option to replay.

2.2 Turn Structure

Roll dice → Animate → Move → Resolve → End turn → Board may trigger events.

3. Board Structure & Generation Rules

3.1 Board Layout

7x7 grid (49 squares) numbered bottom-left to top-right.

Square 1 = Start; Square 49 = Finish.

3.2 Generation Order

Place ladders/chutes according to persona bias.

Place special squares (from Section 4) on remaining tiles.

Ensure no back-to-back instant-loss chains.

Weight placement to match persona algorithm (Section 6).

3.3 Square Distribution Targets

Chute/Ladder starts & ends: ~12 squares.

Remaining 36 squares (per board):

Safe: 6

Simple animation: 6

Movement modifiers: 5

Targeted movement: 4

Simple battles: 6

Random events: 3

4. Square Types & Behaviors

4.1 Safe Squares

Safe Rest – Nothing happens.

View Ahead – Reveals next 3 tiles’ icons.

Freebie – Removes current debuff.

4.2 Simple Animation Squares

Pick a Card – Choose 1 of 3; safe, move forward, punished.

Spin Token – RNG wheel for +2, -2, or no move.

Mystery Bag – 50% bonus, 50% lose turn.

4.3 Movement Modifier Squares

Move Back X Spaces

Move Forward X Spaces

Leap to Nearest Ladder Start

Fall to Nearest Chute Start

4.4 Targeted Movement Squares

Go to Nearest Trap

Go to Nearest Bonus

Go to Nearest Persona Penalty

4.5 Simple Battle Squares

Tap Race – Tap faster than phantom.

Quick Aim – Tap moving target before time runs out.

Memory Match – Match icons in sequence.

Dodge Drop – Avoid 3 falling objects.

4.6 Random Event Squares

Storm Shift – Swap locations of 2 special tiles.

Trade Places – Swap with phantom piece.

Double Roll – Roll twice next turn but spawn extra trap.

4.7 Lingering Penalties (Debuffs)

Definitions:

Trap: A square that counts toward Daredevil’s death if hit consecutively.

Sticky Square: A square that forces an extra turn penalty (lose a roll, remain in place, or delayed exit).

Debuff: Any lingering penalty that reduces player capacity until cleared.

Lingering Penalty Types

Slow Roll – Dice rolls capped at 1–3 for 2 turns.

Slippery Grip – Auto-slide forward/backward 1 space after each turn until cleared.

Fogged Vision – Board icons blurred for next 5 tiles.

Heavy Pack – Player cannot use ladders until cleared.

Penalty Removal Squares

Refresh Fountain – Clears all active debuffs.

Wind Gust – Clears Slippery Grip.

Torchlight – Clears Fogged Vision.

Lighten Load – Clears Heavy Pack.

Lucky Charm – Clears Slow Roll.

4.8 Persona-Specific Squares

Tactician Trap – Player loses 1 turn planning (counts toward Tactician’s “trapped” death mechanic).

Daredevil Risk – Player must flip coin; lose = take 2 extra traps in a row.

Lucky Spin – 3 spins; if all fail, triggers “luck death” progress.

Persistent Grind – Repeat a mini-game twice in a row.

Sprinter Stop – Forces immediate halt; overshoot counter +1.

Jumper Snag – Jump fails automatically; counts toward jumper’s death tally.

6. Persona System & Board Interaction

6.1 Persona Traits

Personality Strength:

Tactician: +20% ladders, +15% chute length.

Daredevil: +15% shortcuts, +20% traps.

Playstyle Trait:

Lucky: +15% bonus squares, +10% easy mini-games.

Persistent: +15% small obstacles, -10% chute frequency.

Movement Setting:

Sprinter: +1 square movement average, +15% stop tiles.

Jumper: Can skip 1 square after landing, +15% sticky tiles.

6.2 Death Mechanics

Tactician: Death if trapped 3 turns.

Daredevil: Death if 3 trap tiles in a row.

Lucky: Death if 3 luck-based mini-game losses in a run.

Persistent: Death if 5 total mini-game failures.

Sprinter: Death if overshooting finish 3 times.

Jumper: Death if failing 3 jumps in a row.

8. Generated Boards for Each Persona Type

Notation: L = Ladder Start, LE = Ladder End, C = Chute Start, CE = Chute End, S = Safe, SA = Simple Animation, M = Movement Modifier, T = Targeted Movement, B = Battle, R = Random Event, P = Persona-Specific.

8.1 Tactician + Lucky + Sprinter 
For picture, refer to character1.png

(Equal trap/bonus tiles, 6 ladders, 6 chutes, most objective gameplay)

8.2 Tactician + Lucky + Jumper
For picture, refer to character2.png

(High ladders, sticky tiles, bonus bias.)

8.3 Tactician + Persistent + Sprinter
For picture, refer to character3.png

(Fewer chutes, grind obstacles, high ladder placement.)

8.4 Tactician + Persistent + Jumper
For picture, refer to character4.png

(Ladders, sticky squares, reduced chute ratio.)

8.5 Daredevil + Lucky + Sprinter
For picture, refer to character5.png

(Trap-heavy, bonus lure tiles, high risk/reward.)

8.6 Daredevil + Lucky + Jumper
For picture, refer to character6.png

(Traps + sticky squares, bonus clusters.)

8.7 Daredevil + Persistent + Sprinter
For picture, refer to character7.png

(More obstacles, fewer ladders, heavier traps.)

8.8 Daredevil + Persistent + Jumper
For picture, refer to character8.png

(Trap density, sticky grind, minimal chute aid.)

9. Graphics & Visual Style

Board: 7x7 numbered grid.

Chutes: Curved translucent overlays, raindrop animation.

Ladders: Straight stylized rails with sparkles.

Tile Styles:

Safe = plain color + icon.

Animation = pulsing border.

Modifier = arrow markers.

Targeted = compass icon.

Battle = crossed swords.

Random = starburst.

Persona = custom emblem (depends on trait).

Reshuffle: Fade-out/in with particle burst on changing tiles.



10 - RULES!(L-START = Ladder start tile) (C-START = chute start tile) (L-END = Ladder enf tile) (C-END = chute end tile) ("L" = ladder) ("C" = chute)Persona → Board pipeline (8 fixed board “families”)

10. Clarification

Board Shape

Board is always a 7×7 snaking path (row 1 left→right, row 2 right→left, and so on until 49).

Start = tile 1, Finish = tile 49.

Ladders & Chutes + Graphics

Ladders may run vertically or diagonally.

Chutes are vertical or diagonal drops.

Ladders and chutes are thinner than the full tile so icons beneath remain visible.

Visual overlap allowed: icons must always display priority (ladder/chute structure + tile icon).

Animation Priority (Tile Interactions)

Trigger tile → open animation.

Load and play mini-game if present.

Resolve result.

Close animation.

Return to board, re-show dice.

Animations queue in strict order; no overlapping events.

Persona → Board Pipeline (8 Board Families Only)

On start, the 3 selected traits map to 1 of 8 fixed board families.

Each family applies layout bias, content mix, and weighting:

Tactician+Lucky+Sprinter = Ladder-rich, long chutes guarding bonuses, frequent stop tiles, bonus bait.

Tactician+Lucky+Jumper = Ladder clusters, sticky/anti-jump traps near rewards, hidden long chutes.

Tactician+Persistent+Sprinter = Many short chutes, grind obstacles, stop tiles pre-ladder, moderate bonuses.

Tactician+Persistent+Jumper = Ladders + short chutes, periodic sticky tiles, guaranteed debuff removers within 10.

Daredevil+Lucky+Sprinter = Trap clusters + shortcut portals, generous bonuses on risky lines, stop tiles for overshoot.

Daredevil+Lucky+Jumper = Shortcuts placed just beyond jump reach, traps on jump landings, bonuses as bait.

Daredevil+Persistent+Sprinter = Mild frequent traps, fewer ladders, stop tiles, scheduled removers to prevent soft-lock.

Daredevil+Persistent+Jumper = High trap density with softened effects, sticky grind, minimal chutes, frequent removers.

Spacing & Placement Rules

Ladders/chutes placed first. Minimum span = 5 tiles.

At least 2-tile lateral spacing between chute/ladder starts on same row.

Forbidden placements: chute start on 47–49; ladder start on 48; no start/end on 1 or 49.

No chute end → chute start chains >1 without a neutral tile.

No ladder end → chute start immediately after.

In any 5-tile sliding window: max 2 “trap-like” tiles.

Each 7-tile row must include ≥1 safe tile.

Persona-specific tiles: only for chosen traits; max 1 per trait, 3 total.

Adjust counts if >49 tiles: remove SAFE first, then ANIM, never ladders/chutes.

Overshoot rule: passing or landing on 49 = win. Stop effects on 49 ignored.

Persona-Specific Squares

Have unique color-coded frames per trait.

They are their own category (not re-skinned safe/penalty).

Each has a “starter” (where effect is gained) and “trigger end” (where effect resolves).

Lingering Penalties (Debuffs)

Tied 1:1 with trait considerations. Only spawn if that trait is active.

Tactician – Analysis Paralysis: skip next roll, counts toward death. Must place Refresh Fountain within 10 tiles.Daredevil – Reckless Mark: next 2 trap hits count double. Must place Guardian Angel within 8 tiles.Lucky – Cold Streak: luck mini-games flip hard mode for 3 triggers. Must place Lucky Charm within 10 tiles or next bonus.Persistent – Wearing Down: every 3rd tile is micro-challenge, max 4 triggers. Must place Second Wind within 12 tiles.Sprinter – Red Lights: next 2 moves stop at first stop tile. Must place Green Light within 7 tiles.Jumper – Snagged Laces: jump disabled 2 turns, failed jump counts as death. Must place Untangle within 7 tiles.

Rules for Lingering Penalties:

Can only stack if they function simultaneously (e.g., Snagged Laces + Fogged Vision).

Otherwise, board adapts: new penalty queues or converts into a one-shot minor penalty.

Each debuff placement automatically schedules a remover ahead; if no legal slot exists, re-roll placement or downgrade to non-lingering.

Only one major debuff active at a time.

Sanity Checks / Bug-Proofing

Generation uses deterministic seed (persona + run seed).

After generation:

Verify at least one legal path from 1 → 49 without hitting death before removers.

Last row (43–49): ≤2 traps, no chute starts.

No infinite loops (detect repeating 3-step cycles).

Targeted-movement tiles require valid target ahead or downgrade to SAFE.

Collision priority: L/C starts/ends > targeted > movement modifiers > random > battle > simple animation > safe.

“Storm Shift” cannot move ladders/chutes; rerun sanity pass after swaps.

Biasing always rounds totals in order (ladders → chutes → specials) to ensure 49.

Harsh effects capped: only 1 per turn; extras convert to cosmetic feedback.