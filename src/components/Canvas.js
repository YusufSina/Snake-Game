import React, { Component } from 'react';

let Bas = {
    X: 50,
    Y: 10,
    prevX: 50,
    prevY: 10,
}
let yilan = [
    { X: 40, Y: 10, prevX: '', prevY: '' },
    { X: 30, Y: 10, prevX: '', prevY: '' },
    { X: 20, Y: 10, prevX: '', prevY: '' },
    { X: 10, Y: 10, prevX: '', prevY: '' },
    { X: 0, Y: 10, prevX: '', prevY: '' },
    { X: -10, Y: 10, prevX: '', prevY: '' },
    { X: -20, Y: 10, prevX: '', prevY: '' },
    { X: -30, Y: 10, prevX: '', prevY: '' },
    

];
let Elma = {
    X:100,
    Y:100
}
let Score = 0;
let myInterval;




export default class Canvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            head: 'right',
            Score : 0,
        }
    
        console.log(Math.floor(Math.random()*100))



    }

    componentDidMount = () => { // render edildikten sonra cagrilir
        document.addEventListener("keydown", (e) => {
            if (e.key == "ArrowRight" && this.state.head != 'left') {
                this.setState({
                    head: 'right'
                })
            } else if (e.key == "ArrowLeft" && this.state.head != 'right') {
                this.setState({
                    head: 'left'
                })
            } else if (e.key == "ArrowUp" && this.state.head != 'down') {
                this.setState({
                    head: 'up'
                })
            } else if (e.key == "ArrowDown" && this.state.head != 'up') {
                this.setState({
                    head: 'down'
                })
            }
        })

        myInterval = setInterval(
            this.GameStart.bind(this), 50);

    }
    componentDidUpdate() {
    }


    updateCanvas = () => {
        const ctx = this.refs.canvas.getContext('2d');

        ctx.clearRect(Bas["prevX"], Bas["prevY"], 10, 10);
        ctx.fillRect(Bas["X"], Bas["Y"], 10, 10);
        this.ElmaCiz(ctx);

        yilan.map(kare => {
            ctx.clearRect(kare["prevX"], kare["prevY"], 10, 10);
            ctx.fillRect(kare["X"], kare["Y"], 10, 10);
        })

    }
    
    GameStart() {
        this.updateCanvas();
        for (let i = 1; i < yilan.length; i++) {
            Bas['prevY'] = Bas['Y'];
            Bas['prevX'] = Bas['X'];
            yilan[0]["prevX"] = yilan[0]["X"];
            yilan[0]["prevY"] = yilan[0]["Y"];
            yilan[0]["X"] = Bas["prevX"];
            yilan[0]["Y"] = Bas["prevY"];
            yilan[i]["prevX"] = yilan[i]["X"];
            yilan[i]["prevY"] = yilan[i]["Y"];
            yilan[i]["X"] = yilan[i - 1]["prevX"];
            yilan[i]["Y"] = yilan[i - 1]["prevY"];
        }
        if (this.state.head == "right") {
            Bas["X"] += 10;
        } else if (this.state.head == "left") {
            Bas["X"] -= 10;
        } else if (this.state.head == "up") {
            Bas["Y"] -= 10;
        } else if (this.state.head == "down") {
            Bas["Y"] += 10;
        }

        this.ElmaYendimi();
        this.YilanUsteGeldimi();

        if (Bas["X"] < 0) this.GameStop();
        else if (Bas["X"] > 490) this.GameStop();
        else if (Bas["Y"] < 0) this.GameStop();
        else if (Bas["Y"] > 290) this.GameStop();
    }

    ElmaCiz(ctx){
        
        ctx.fillRect(Elma["X"],Elma["Y"],10,10);
    }
    ElmaYendimi(){
        if(Bas["X"] == Elma["X"] && Bas["Y"] == Elma["Y"] ){
            this.setState({
                Score : this.state.Score+1,
            })
            
            Elma["X"] = Math.floor(Math.random()*50)*10
            Elma["Y"] = Math.floor(Math.random()*30)*10
            yilan.map((kare)=>{
                while((kare["X"] == Elma["X"] && kare["Y"] == Elma["Y"]) || (Bas["X"] == Elma["X"] && Bas["Y"] == Elma["Y"])){
                    Elma["X"] = Math.floor(Math.random()*50)*10
                    Elma["Y"] = Math.floor(Math.random()*30)*10
                }
            })
            yilan.push({X:yilan[yilan.length-1]["X"],Y:yilan[yilan.length-1]["Y"],prevX:'',prevY:''})

        }
    }
    YilanUsteGeldimi(){
        yilan.map((kare) => {
            if(Bas["X"] == kare["X"] && Bas["Y"] == kare["Y"]){
                this.GameStop()
            }
        })
    }
    GameStop() {
        clearInterval(myInterval);
    }

    render() {

        //console.log(Bas['X'] + " " + Bas["Y"]);
        return (
            <div>
                <br></br>
                <canvas ref="canvas" width={500} height={300} style={{ 'border': '2px solid black' }}

                ></canvas>
                <br></br>
                <span>Your Score : {this.state.Score}</span>
            </div>
        )
    }
}
