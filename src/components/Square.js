export class Square {
    constructor(status, aliveColor, deadColor, i, j){
        this.status = status;
        // this.color = this.findColor();
        this.activeColor = this.findColor()
        this.aliveColor = aliveColor
        this.deadColor = deadColor
        this.x = j
        this.y = i
    }

    findColor = () => {
        console.log('in findColor', this.aliveColor)
        if (this.status == 1){
            console.log('in the if', this.aliveColor)
            return this.aliveColor
        } else{
            console.log('in the else', this.deadColor)
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