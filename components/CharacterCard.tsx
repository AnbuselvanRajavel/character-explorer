import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Character } from "../types/character";

export const CharacterCard = ({ character }: { character: Character }) => {
  return (
    <Card className="w-full max-w-xs">
      <CardHeader>
        <img src={character.image} alt={character.name} className="rounded-lg" />
      </CardHeader>
      <CardContent className="space-y-1">
        <h3 className="text-lg font-bold">{character.name}</h3>
        <p>Status: {character.status}</p>
        <p>Gender: {character.gender}</p>
      </CardContent>
    </Card>
  );
};