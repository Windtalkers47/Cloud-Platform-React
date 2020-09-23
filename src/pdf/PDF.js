import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Chartlist from "./chart";

export default function PDF(props) {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });
    return (
        <div>
            <ComponentToPrint 
              ref={componentRef} 
              cpu_total={props.cpu_total}
              cpu_datetime={props.cpu_datetime}
              cpu_downtime={props.cpu_downtime}
              disk_FreeSpace={props.disk_FreeSpace}
              disk_datetime={props.disk_datatime}
              disk_downtime={props.disk_downtime}
              memory_percent={props.memory_percent}
              memory_datetime={props.memory_datetime}
              memory_downtime={props.memory_downtime}
            />
            <button onClick={handlePrint}>Print Report</button>
        </div>
    )
}

class ComponentToPrint extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  
  render() {
    return (
      <Chartlist {...this.props}
      />
    );
  }
}