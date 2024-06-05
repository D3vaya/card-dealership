import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Car } from './car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'toyota',
      model: 'corolla',
    },
    {
      id: uuid(),
      brand: 'honda',
      model: 'civic',
    },
    {
      id: uuid(),
      brand: 'bmw',
      model: 'm3',
    },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id ${id} not found`);

    return car;
  }

  create(createCarDto: CreateCarDto) {
    const car: Car = {
      id: uuid(),
      ...createCarDto,
    };
    this.cars.push(car);

    return car;
  }

  update(id: string, updatedCarDto: UpdateCarDto) {
    let carDB = this.findOneById(id);

    if (updatedCarDto.id && updatedCarDto.id !== id) {
      throw new BadRequestException('Car id is not valid inside body');
    }
    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = {
          ...carDB,
          ...updatedCarDto,
          id,
        };
        return carDB;
      }

      return car;
    });

    return carDB;
  }

  delete(id: string) {
    const car = this.findOneById(id);
    this.cars = this.cars.filter((car) => car.id !== id);
  }
}
