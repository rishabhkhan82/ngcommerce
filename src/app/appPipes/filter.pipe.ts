import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {


  transform(value: any, searchTerm: any, searchType: any): any {
  
    console.log(searchType);

    if(searchType == 'name') {
      return value.filter(function(searching:any) {
        return searching.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      })
    }

    else {
      return value.filter(function(searching:any) {
        return searching.category.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      })
    }

      


    
  }

}
