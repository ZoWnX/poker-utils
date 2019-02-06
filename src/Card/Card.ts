import {Rank} from './Rank';
import {Suit} from './Suit';

const SUITS:Suit[] = [
  new Suit('Clubs','C'),
  new Suit('Diamonds', 'D'),
  new Suit('Hearts', 'H'),
  new Suit('Spades', 'S')
];

const RANKS:Rank[] = [
  new Rank(2, '2', 'Duece', 'Dueces'),
  new Rank(3, '3', 'Three', 'Threes'),
  new Rank(4, '4', 'Four', 'Fours'),
  new Rank(5, '5', 'Five', 'Fives'),
  new Rank(6, '6', 'Six', 'Sixes'),
  new Rank(7, '7', 'Seven', 'Sevens'),
  new Rank(8, '8', 'Eight', 'Eights'),
  new Rank(9, '9', 'Nine', 'Nines'),
  new Rank(10, 'T', 'Ten', 'Tens'),
  new Rank(11, 'J', 'Jack', 'Jacks'),
  new Rank(12, 'Q', 'Queen', 'Queens'),
  new Rank(13, 'K', 'King', 'Kings'),
  new Rank(14, 'A', 'Ace', 'Aces')
];

export class Card {
  private rank: Rank;
  private suit: Suit;

  constructor(cardStr: string) {
    if(cardStr.length !== 2) {
      throw new Error("Cards are two characters {Rank}{Suit}");
    }

    cardStr = cardStr.toUpperCase();

    const rankStr = cardStr.charAt(0);
    const suitStr = cardStr.charAt(1);

    this.rank = RANKS.filter((obj:Rank) => {
      return obj.charName === rankStr;
    })[0];

    if(this.rank === undefined) {
      throw new Error("Rank must be [2-9,T,J,K,A]");
    }

    this.suit = SUITS.filter((obj:Suit) => {
      return obj.charName === suitStr;
    })[0];

    if(this.suit === undefined){
       throw new Error("Suit must be [C, D, H, S]");
    }
  }

  public getRank():Rank { return this.rank; }
  public getRankName():string {return this.rank.name; }
  public getRankPlural():string { return this.rank.pluralName; }
  public getRankCharName():string { return this.rank.charName; }

  public getSuit():Suit { return this.suit; }
  public getSuitName():string { return this.suit.name; }
  public getSuitCharname():string { return this.suit.charName; }

  public longToString():string {
    return `${this.rank.name} of ${this.suit.name}`;
  }

  public toString():string {
    return `${this.rank.charName}${this.suit.charName}`;
  }
}
