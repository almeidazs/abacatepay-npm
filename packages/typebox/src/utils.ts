import { Type } from '@sinclair/typebox';

export const StringEnum = <V extends string>(
	values: V[],
	description: string,
) =>
	Type.Union(
		values.map((value) => Type.Literal(value)),
		{ description },
	);
