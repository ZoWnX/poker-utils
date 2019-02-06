export class Position {
  public static getPosition(numSeats:number, seat:number):Position {
    /* tslint:disable:no-string-literal */
    if(seat < 1 || seat > numSeats) {
      throw new Error("Seat must >= 1 and < the number of seats");
    }
    if(numSeats < 2 || numSeats > 10) {
      throw new Error("Number of seats must be between 2 and 10");
    }
  
    // easy cases first
  
    // headsup special rules
    if(numSeats === 2) {
      if(seat === 1) {
         return this.POSITIONS['bb'];
      } else {
         return this.POSITIONS['btn/sb'];
      }
    }
  
    // last and first
    if(seat === numSeats) {
      return this.POSITIONS['btn'];
    }
    if(seat === 1) {
      return this.POSITIONS['sb'];
    }
  
    // not heads up
    if(numSeats > 2) {
      if(seat === 2) { 
        return this.POSITIONS['bb'];
      }
  
      // start walking back and front to middle
      const seatDiff:number = numSeats - seat;
      if(seatDiff === 1) { return this.POSITIONS['co']; }
      if(seat === 3) { return this.POSITIONS['utg']; }
      if(seatDiff === 2) { return this.POSITIONS['hj']; }
      if(seatDiff === 3) { return this.POSITIONS['lj']; }
  
      // weird seats
      if((numSeats === 8 && seat === 4) || (numSeats > 8 && seat === 5)) {
        return this.POSITIONS['mp'];
      }
      if(numSeats > 8 && seat === 4) {
        return this.POSITIONS['utg1'];
      }
      /*
      if(numSeats > 9 && seat == 6) {
        return POSITIONS['mp1'].pos;
      }*/
  
    }
  
    return this.POSITIONS['mp1'];
  }

  private static POSITIONS: {[index:string] : Position } = {
    'bb': new Position('bb', 'Big Blind'),
    'btn': new Position('btn', 'Button'),
    'btn/sb': new Position('btn/sb', 'Button/Small Blind'),
    'co': new Position('co','Cut Off'),
    'hj': new Position('hj', 'High Jack'),
    'lj': new Position('lj', 'Low Jack'),
    'mp': new Position('mp', 'Middle Position'),
    'mp1': new Position('mp1', 'Middle Position plus One'),
    'sb': new Position('sb', 'Small Blind'),
    'utg': new Position('utg', 'Under The Gun'),
    'utg1': new Position('utg1', 'Under The Gun plus One')
  }

  public shortName: string;
  public longName: string;

  private constructor(shortName: string, longName: string) {
    this.shortName = shortName;
    this.longName = longName;
  }
}
