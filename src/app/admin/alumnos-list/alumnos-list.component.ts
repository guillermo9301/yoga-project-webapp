import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alumnos-list',
  templateUrl: './alumnos-list.component.html',
  styleUrls: ['./alumnos-list.component.css']
})
export class AlumnosListComponent {
  alumnos = [
    { nombre: 'Juan', apellidoPaterno: 'Pérez', apellidoMaterno: 'García', correo: 'juan.perez@gmail.com', fechas: ['2023-01-15', '2023-05-22', '2023-09-10'], asistencia: false },
    { nombre: 'María', apellidoPaterno: 'López', apellidoMaterno: 'Martínez', correo: 'maria.lopez@gmail.com', fechas: ['2023-02-10', '2023-06-18', '2023-10-05'], asistencia: false },
    { nombre: 'Carlos', apellidoPaterno: 'Hernández', apellidoMaterno: 'Rodríguez', correo: 'carlos.hernandez@gmail.com', fechas: ['2023-03-12', '2023-07-25', '2023-11-30'], asistencia: false },
    // Añadir más alumnos según sea necesario
  ];

  selectedAlumno: any = null;

  constructor() { }

  ngOnInit(): void {
  }

  selectAlumno(alumno: any): void {
    this.selectedAlumno = alumno;
  }
}
