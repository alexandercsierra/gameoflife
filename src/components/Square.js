export class Square {
    constructor(status, aliveColor, deadColor, i, j){
        this.status = status;
        // this.color = this.findColor();
        this.activeColor = this.findColor()
        this.aliveColor = aliveColor
        this.deadColor = deadColor
        this.x = j
        this.y = i
        this.topi = i-1
        this.topj = j

        this.btmi = i + 1
        this.btmj = j

        this.lefti = i
        this.leftj = j-1

        this.righti = i
        this.rightj = j+1

        this.topLefti= i-1
        this.topLeftj= j-1

        this.topRighti= i-1
        this.topRightj= j+1

        this.btmLefti= i+1
        this.btmLeftj= j-1

        this.btmRighti= i+1
        this.btmRightj= j+1

    }

    /*
    directly above = [i-1][j]
    directly below = [i+1][j]
    
    directly left =  [i][j-1]
    directly right = [i][j+1]
    
    top left =       [i-1][j-1]
    top right =      [i-1][j+1]
    
    bottom left =    [i+1][j-1]
    bottom right =   [i+1][j+1]
    
    */
    findColor = () => {
        if (this.status == 1){
            return this.aliveColor
        } else{
            return this.deadColor
        }
    }

    toggleStatus = () => {
        if(this.status ==1){
            this.status = 0
        } else if (this.status == 0){
            this.status = 1
        }
    }
}

