import {Component} from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage'
class ErrorBoundary extends Component {
  state = {
    error: false,
  }

  // static getDerivedStateFromError(error) {
  //   return {error: true};
  // }

  componentDidCatch(err, errorInfo) {
    console.error(err, errorInfo);
    this.setState({error: true});
  }
  
  render() {
    if(this.state.error) {
      return <ErrorMessage/>
    }
    return this.props.children;
  };
}



export default ErrorBoundary;