import React from 'react';

//Creating context
export const SettingsContext = React.createContext();

class SettingsProvider extends React.Component  {
  
  constructor(props) {
    super(props);

    this.state = {
      displayCompleted:false,
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 3,
      sortField:'difficulty',
      changeDisplayCompleted: this.changeDisplayCompleted,
      changeItemsPerPage: this.changeItemsPerPage,
      changeCurrentPageInc: this.changeCurrentPageInc,
      changeCurrentPageDec: this.changeCurrentPageDec,
      changeSortField: this.changeSortField,
      changeTotalPages: this.changeTotalPages,
    };

  }
  
   changeCurrentPageInc = () => {
     this.setState({ currentPage: (this.state.currentPage += 1) });
   };

   changeCurrentPageDec = () => {
     this.setState({ currentPage: (this.state.currentPage -= 1) });
   };

   changeTotalPages = () => {
     this.setState({ totalPages: (this.state.totalPages += 1) });
   };

  changeDisplayCompleted = () =>{
    this.setState({displayCompleted: (this.state.displayCompleted = true)});
  };

  render() {
    return (
      <SettingsContext.Provider value={this.state}>
        {this.props.children}
      </SettingsContext.Provider>
    );
  }
}

export default SettingsProvider;

// Context  creating
// Provider value = {state}
// Consumer context.state
