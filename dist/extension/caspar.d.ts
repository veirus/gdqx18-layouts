/// <reference types="node" />
import { EventEmitter } from 'events';
import * as CasparCG from 'casparcg-connection';
export declare function play(filename: string): any;
export declare function info(): Promise<CasparCG.Command.IAMCPCommand>;
export declare function loadbgAuto(filename: string): Promise<CasparCG.Command.IAMCPCommand>;
export declare function clear(doResetState?: boolean): Promise<void>;
export declare function stop(): Promise<void>;
export declare function resetState(): void;
export declare const replicants: {
    files: import("../../../../types/lib/replicant").ReplicantServer<{
        name: string;
        nameWithExt: string;
        type: string;
        size: number;
        changed: number;
        frames: number;
        frameTime: string;
        frameRate: number;
        duration: number;
    }[]>;
};
export declare const oscEvents: EventEmitter;
//# sourceMappingURL=caspar.d.ts.map