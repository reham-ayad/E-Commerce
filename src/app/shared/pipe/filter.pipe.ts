import { Pipe, PipeTransform } from '@angular/core';
import { Products } from '../interface/products/products';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(products:Products[],searchValue:string): Products[]{
    return products.filter((product)=>{
      return product.title.toLocaleUpperCase().includes(searchValue.toLocaleUpperCase())
    });
  }

}
