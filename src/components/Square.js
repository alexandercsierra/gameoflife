export class Square {
    constructor(status, aliveColor, deadColor){
        this.status = status;
        this.color = this.findColor();
    }

    findColor = (aliveColor, deadColor) => {
        return this.status == 1 ? aliveColor : deadColor
    }

    toggleStatus = () => {
        if(this.status ==1){
            this.status = 0
        } else if (this.status == 0){
            this.status = 1
        }
    }
}