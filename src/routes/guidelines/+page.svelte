<script>
    import Titlepage from "../Titlepage.svelte";
    import { Separator } from "$lib/components/ui/separator";
</script>

<Titlepage titleName="Record Submission Guidelines" description="If you have any questions or concerns about these guidelines, do not hesitate to contact any Team Member for clarification!" />

<style>
    h1 {
        font-size: 1.6rem;
    }
    h2 {
        font-size: 1.4rem;
    }
    h1, h2 {
        font-weight: bold;
    } 


    ul {
        list-style-type: square;
        margin-left: 3rem;
    }
</style>

<div class="w-full flex flex-col items-center">
    <div class="w-3/4 flex flex-col">
        <h1>Bannable Offenses</h1>
        <ul>
            <li>Records that use prohibited hacks will not be added to the list, and players that pass these records off as legitimate will be blocked until they admit to hacking. Refusing to give proof of legality creates a ground for a ban.</li>
    
            <li>This list describes the hacks we allow for list records, and this section goes into further information about the repercussions of hacked records.</li>
        </ul>
<br>
        <br>

        <h1>Fixing Bugs</h1>
        <ul>
            <li>Players are often permitted to remedy flaws caused by fluctuating refresh rates or in-game physics changes, particularly if the level is rendered unreasonably more difficult or impossible as a result.</li>
    
            <li>Submitting unauthorized bugfixes on a regular basis without first consulting the team may result in a player suspension!</li>
        </ul>
<br>
        <br>

        <h1>Framerate & FPS Counter</h1>
        <ul>
            <li>Players may leverage their monitor's refresh rate or third-party software to achieve a maximum framerate of <u>360FPS</u>.</li>
    
            <li>Every record requires an FPS counter, and Mega Hack version 6 and higher must utilize the Mega Hack FPS counter. FPS counters must also be visible for the whole attempt and entire raw footage that corresponds to the record!</li>
        </ul>
<br>
        <br>

        <h1>Eligibility of Recording</h1>
        <ul>
            <li>Any record's run must begin at the beginning of the level and continue until the provided progress value is reached. Exiting a level in the middle of an attempt, or utilizing only one try in Practice Mode, does not invalidate a record!</li>
    
            <li>It is required that either the finished or raw video featuring audible clicks throughout the whole run. A record with no clicks is certain to be rejected!</li>
    
            <li>Using a skip that does not bypass major sections of the level or change the hardest parts of the level is typically allowed, although players should consider if the skip is still viable in the rated version of the level.</li>
    
            <li>100% recordings that do not show the in-game endscreen will not be eligible for the list, unless the game fails before the endscreen is displayed. Records with illegitimate endscreens will also be rejected.</li>
    
            <li>Please do not delete your progress videos in case the mods ask for them to verify your legitimacy more easily.</li>
        </ul>
<br>
        <br>

        <h1>LDMS, Texture Packs, And the Smooth Fix</h1>
        <ul>
            <li>Low Detail Modes (LDMs) integrated within the original level and published by the creator are automatically allowed to be used.</li>

            <li>If a custom LDM is to be used, please contact a list mod by sharing the public level ID of the said LDM for them to approve that the LDM is usable. A custom LDM should NOT nerf any obstacles nor heavily remove decoration that obscures vision. Players should never just share their level ID with a Team Member!</li>

            <li>It is not allowed to use the Smooth Fix to severely slow down the game. Furthermore, texture packs that clearly modify hitboxes other than the player's own are not authorized.</li>
        </ul>
<br>
        <br>

        <h1>Raw Footage</h1>
        <ul>
            <li>All records require raw footage. Raw footage is an unprocessed video file from a recording program or a livestream of a session.</li>

            <li>Raw footage does not include videos that have been altered or compressed in any way (including downloaded from YouTube). No exceptions will be made for records containing modified raw video. However, if new evidences is presented to us, we will evaluate any rejected record!</li>

            <li>Players who want to submit raw footage must give the file as a shareable Google Drive Link in the 'Raw Footage' section of the submission form or in the video description. If no raw footage is accessible on the completion video, the mods possess the right to ask for the raw footage of that entire session to verify your legitimacy. </li>

            <li>Failure to provide raw footage, especially if your video has hidden clicks, will certainly result into rejection.</li>

            <li>The list mods will respect ones privacy and will not publicize a raw footage provided by people who will submit records.</li>
        </ul>
<br>
        <br>

        <h1>Submissions</h1>
        <ul>
            <li>Records submitted might correlate to a player finishing a level or progressing over the minimal criterion. (List Requirements)</li>

            <li>Players must submit their own records, along with an unedited video of their progress or completion run on a visible google drive. The video should be accessible on YouTube, Facebook, and or Twitch.</li>

            <li>To verify the progress of their submission, If their records are yet to be accepted, players can contact any team member!</li>

            <li>A player has three days to respond to a Team member's inquiry concerning a record before it is automatically discarded. If the player contacts a team member after the deadline, the record will be reviewed.</li>

            <li>You must be a Filipino (unfortunately...) to submit records in the list.</li>
        </ul>
<br>
    </div>
    <div class="flex w-3/4 justify-evenly gap-10">
        <div class="allowed w-1/2">
            <h1>Allowed Hacks</h1>
            <Separator />
            <h2>COSMETICS</h2>
            <ul>
                <li>Accurate Percentage</li>
                <li>Classic Particles</li>
                <li>Coins Show Uncollected</li>
                <li>Collect Coins in Practice</li>
                <li>Dash Orb Colour Split</li>
                <li>Hide Attempts</li>
                <li>Hide Checkpoints</li>
                <li>Hide Pause Button</li>
                <li>Inversed Trail</li>
                <li>Mini Cube Icon</li>
                <li>No Background Flash</li>
                <li>No Death Effect</li>
                <li>No Effect Circle</li>
                <li>No Force Player Glow</li>
                <li>No Glow</li>
                <li>No New  Best Popup</li>
                <li>No Orb Ring</li>
                <li>No Particles</li>
                <li>No Portal Lightning</li>
                <li>No Pulse</li>
                <li>No Respawn Flash</li>
                <li>No Robot Fire</li>
                <li>No Spider Dash</li>
                <li>No Wave Pulse</li>
                <li>No Wave Trail Behind</li>
                <li>Practice Pulse</li>
                <li>Show Total Attempts</li>
                <li>Solid Wave Trail</li>
                <li>Spider Bug Fix</li>
                <li>Stable Pulse</li>
                <li>Stop Triggers on Death</li>
                <li>Trail Always Off</li>
                <li>Trail Always On - [SOMETIMES ALLOWED] (Only allowed if the level does not include a section with the Hide Player trigger)</li>
                <li>Trail Bug Fix</li>
                <li>Wave Trail Bug Fix </li>
                <li>Wave Trail on Death</li>
                <li>Level Edit - [SOMETIMES ALLOWED] (Level edit can be used for bugfixes, start positions, and changing song offset - LDMs must be on separate copies!)</li>
            </ul>
            <br>
            
            <h2>LEVEL</h2>
                <ul>
                    <li>0% Practice Complete</li>
                    <li>Anti Crash Trigger - [SOMETIMES ALLOWED] (Use of this hack on a level where you come in contact with a crash trigger will result in a reject)</li>
                    <li>Auto Deafen</li>
                    <li>Auto Kill - (Only eligible for a record at whatever % you die at)</li>
                    <li>Auto Low Detail Mode</li>
                    <li>Auto Music Sync</li>
                    <li>Auto No Auto-Retry</li>
                    <li>Auto Practice Mode</li>
                    <li>Ball Rotation Bug</li>
                    <li>Confirm Exit</li>
                    <li>Corrective Music Sync</li>
                    <li>Everything Hurts (Only eligible for a record at whatever % you die at)</li>
                    <li>Ignore ESC</li>
                    <li>P1/P2 Input Switch</li>
                    <li>Pause During Complete</li>
                    <li>Practice Bug Fix</li>
                    <li>Practice Music Hack</li>
                    <li>Show Hitboxes on Death</li>
                    <li>StartPos Lag Bug Fix</li>
                    <li>StartPos Switcher - (Run must start from the very beginning of the level)</li>
                    <li>Void Click Bug Fix</li>
                </ul>
<br>
            <h2>UNIVERSAL</h2>
                <ul>
                        <li>Allow Low Volume</li>
                        <li>Auto Safe Mode</li>
                        <li>Fast Alt-Tab</li>
                        <li>Force Visibility</li>
                        <li>Free Window Resize - [SOMETIMES ALLOWED] (Any abuse of changing window size will result in a reject.)</li>
                        <li>Lock Cursor</li>
                        <li>Mute on Unfocus</li>
                        <li>No Menu Music</li>
                        <li>No Transition</li>
                        <li>Pause on Unfocus</li>
                        <li>Pitch Shifter</li>
                        <li>Safe Mode</li>
                        <li>Transition Customiser</li>
                        <li>Transparent BG</li>
                        <li>Transparent Lists</li>
                </ul>
<br>
            <h2>VARIABLES</h2>
                <ul>
                    <li>Wave Pulse Size - [SOMETIMES ALLOWED] (Only to decrease the wave pulse size - increasing the size is not allowed! (Default size = 2.1))</li>
                    <li>SongID - (Changing the song for any level is allowed)</li>
                    <li>Fast Respawn Time</li>
                </ul>
<br>
            <h2>STATUS</h2>
                <ul>
                    <li>Opacity - (Make sure your FPS Counter is visible!)</li>
                    <li>Scale</li>
                    <li>Fonts</li>
                    <li>Edit Order</li>
                    <li>Testmode</li>
                    <li>Cheat Indicator (NOTE: The Cheat Indicator must always be enabled!)</li>
                    <li>Message</li>
                    <li>Show Percentage</li>
                    <li>FPS Counter (NOTE: The FPS Counter must always be enabled for Mega Hack v6/v7, Mega Hack Mobile, ItalianApkDownloader Mod Menu.)</li>
                    <li>CPS Counter</li>
                    <li>Clock</li>
                    <li>Session Time</li>
                    <li>LevelID</li>
                    <li>Best Run</li>
                    <li>Attempts</li>
                    <li>Jumps</li>
                    <li>Replay Status</li>
                    <li>Meta: Dead (Label)</li>
                </ul>
<br>
            <h2>STATUS</h2>
                <ul>
                    <li>Icon Effects (Player 1, Player 2, Colour 1, Colour 2, Glow, Trail, Particles, Wave, Cycle Speed)</li>
                    <li>Same Dual Color</li>
                    <li>Icon Randomiser</li>
                    <li>Thread Priority (MEGA HACK PRO)</li>
                </ul>
<br>
            <h2>DISPLAY</h2>
                <ul>
                    <li>FPS Bypass - (Allowed up to 360fps)</li>
                    <li>TPS Bypass - (Allowed up to 360tps + Mega Hack FPS/TPS Counter must be enabled)</li>
                    <li>Physics Bypass - (Allowed up to 360pfps )</li>
                    <li>Vertical Sync</li>
                    <li>Smooth Fix - (As long as it doesn't slow down the game too much)</li>
                    <li>Force Smooth Fix, Force SF - (As long as it doesn't slow down the game too much)</li>
                    <li>Flicker Fix</li>
                    <li>Low Detail - (Help LDM)</li>
                </ul>
<br>
            <h2>OTHER</h2>
                <ul>
                    <li>AntiCheat Bypass</li>
                    <li>Hide Level Complete Screen (The endscreen must be visible and readable for any 100% record)</li>
                    <li>Invisible Dual Fix</li>
                    <li>Only Show %</li>
                </ul>
<br>
        </div>

        <div class="prohibited w-1/2">
            <h1>Prohibited Hacks</h1>
            <Separator />
            <h2>COSMETICS</h2>
            <ul>
                <li>Force Don't Enter</li>
                <li>Force Don't Fade</li>
                <li>Force Objects Invisible</li>
                <li>Hide Pause Menu [Not allowed during an attempt, treated as if a death occurs where the player pauses.]</li>
                <li>Hide Player</li>
                <li>No Dash Trail</li>
                <li>No Ghost Trail</li>
                <li>No Mirror</li>
                <li>No Wave Trail</li>
            </ul>
<br>
            <h2>LEVELS</h2>
            <ul>
                <li>Auto Clicker</li>
                <li>Force Block Type</li>
                <li>Frame Stepper</li>
                <li>Freeroam</li>
                <li>Freeze Player</li>
                <li>Hitbox Multiplier</li>
                <li>Instant Complete</li>
                <li>Jump Hack</li>
                <li>No Hitbox</li>
                <li>No Solids</li>
                <li>No Spikes</li>
                <li>Noclip</li>
                <li>Noclip Accuracy</li>
                <li>Noclip Deaths</li>
                <li>Pause Countdown [Treated as if a death occurs where the player pauses]</li>
                <li>Reverse Inputs</li>
                <li>Show Hitboxes</li>
                <li>Show Layout</li>
                <li>Show Trajectory</li>
            </ul>
<br>
            <h2>VARIABLES</h2>
            <ul>
                <li>Gravity</li>
                <li>Mirror Speed</li>
                <li>Rotation Modifier</li>
                <li>Size</li>
                <li>Speed</li>
                <li>X Pos</li>
                <li>Y Pos</li>
            </ul>
<br>
            <h2>STATUS</h2>
            <ul>
                <li>Frame</li>
                <li>Full Precision (Labels)</li>
                <li>Gravity</li>
                <li>Hide All</li>
                <li>Rotation</li>
                <li>Speed</li>
                <li>X Pos</li>
                <li>Y Pos</li>
                <li>Y Vel</li>
            </ul>
<br>
            <h2>DISPLAY</h2>
            <ul>
                <li>Lock Delta</li>
                <li>Real Time</li>
            </ul>
<br>
            <h2>MISCELLENEOUS</h2>
            <ul>
                <li>Capture (MH v7.1 Category)</li>
                <li>Macros: Record</li>
                <li>Macros: Replay</li>
                <li>No Rotation</li>
                <li>P1 Swift, P2 Swift</li>
                <li>Speedhack</li>
            </ul>
<br>
        </div>
    </div>
    
</div>