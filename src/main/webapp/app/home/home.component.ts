import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService, Principal, Account } from 'app/core';
import { CourseService } from 'app/shared/service/CourseService';
import { CourseDto } from 'app/shared/model/course-dto.model';
import { CourseWithTNDto } from 'app/shared/model/courseWithTN-dto.model';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.css']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    classeNameNeedToReg: string;
    courses: CourseDto[] = [];
    coursesRegistered: CourseDto[] = [];
    courseAdd: CourseDto = new class implements CourseDto {
        courseContent: string;
        courseLocation: string;
        courseName: string;
        teacherId: number;
    }();
    coursesWithTN: CourseWithTNDto[] = [];
    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private courseService: CourseService
    ) {}

    ngOnInit() {
        this.principal.identity().then(account => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.principal.identity().then(account => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    getAllCourses() {
        debugger;
        this.courseService.getCourseInfo().subscribe(curDto => {
            if (!curDto) {
                this.courses = [];
            } else {
                this.courses = curDto;
            }
        });
    }

    getAllRegisteredCourses() {
        debugger;
        this.courseService.getRegisteredCourseInfo().subscribe(curDto => {
            if (!curDto) {
                this.coursesRegistered = [];
            } else {
                this.coursesRegistered = curDto;
            }
        });
    }

    getAllCoursesWithTN() {
        this.courseService.getCourseInfoWithTN().subscribe(curDto => {
            if (!curDto) {
                this.coursesWithTN = [];
            } else {
                this.coursesWithTN = curDto;
            }
        });
    }

    registerCourse(courseName) {
        debugger;
        this.courseService.regCourse(courseName).subscribe();
    }

    removeRegisteredCourse(courseName) {
        debugger;
        this.courseService.removeRegCourse(courseName).subscribe();
    }

    clearAllCourses() {
        this.courses = [];
        this.coursesWithTN = [];
    }

    clearAllRegisteredCourses() {
        this.coursesRegistered = [];
    }

    // addCourseToStudent() {
    //     const courseName = 'temp';
    //    this.courseService.addCourseToStudent(courseName, currentUserCredential);
    // }

    addCourse() {
        debugger;
        this.courseService.addCourse(this.courseAdd).subscribe();
    }

    deleteCourse(courseName) {
        debugger;
        this.courseService.delete(courseName).subscribe();
    }
}
