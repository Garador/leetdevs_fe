import * as React from 'react';

export class SmallTimer extends React.Component<{
    endDate: Date
}> {
    state = {
        timer: null,
        timeLeftNumber: 0
    }

    constructor(props:any){
        super(props);
    }

    componentWillUnmount(){
        this.unsetTimer();
    }

    componentDidMount(){
        this.startTimer();
    }

    startTimer(){
        this.unsetTimer();
        let timeLeftNumber = Math.floor((this.props.endDate.getTime() / 1000) - (new Date().getTime() / 1000));
        const timer = setInterval(()=>{
            if(this.state.timeLeftNumber <= 0){
                this.unsetTimer();
            }
            this.setState((element:any)=>{
                element.timeLeftNumber = element.timeLeftNumber - 1;
                return element;
            })
        }, 1000)
        this.setState({timer, timeLeftNumber});
    }

    unsetTimer(){
        if(this.state.timer){
            clearInterval(this.state.timer);
        }
    }

    getFormatted(){
        return this.state.timeLeftNumber;
    }

    render(){
        const {timer, timeLeftNumber} = this.state;
        const timeLeftFormatted = this.getFormatted();

        if(!timer || !timeLeftFormatted || timeLeftNumber <= 0){
            return <span></span>
        }
        return (
            <span>
                {timeLeftFormatted}
            </span>
        )
    }
}