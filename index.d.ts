export type Edge<T> = [T, T];
export type Edges<T> = Edge<T>[];
export default function depthFirst<T>(edges: Edges<T>, node: T, opts?: {
    reverse?: boolean;
}): Array<T>;
