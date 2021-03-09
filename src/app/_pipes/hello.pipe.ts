import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hello'
})
export class HelloPipe implements PipeTransform {

  transform(value: unknown, name: string, age: number = null): unknown {
    if (age) {
      return `${value} ${name}! You are ${age} years old`;
    } else {
      return `${value} ${name}!`;
    }
  }

}
