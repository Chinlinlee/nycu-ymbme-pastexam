import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { INYCUUser } from "src/models/nycu.user.model";


@Injectable({
    providedIn: 'root'
})
export class SharedService {
    private userItem = new BehaviorSubject<INYCUUser>({
        username: "",
        email: "",
    });
    public userItem$ = this.userItem.asObservable();

    private courseItem = new BehaviorSubject<Object>({});
    public courseItem$ = this.courseItem.asObservable();

    private isMobileItem = new BehaviorSubject<boolean>(false);
    public isMobileItem$ = this.isMobileItem.asObservable();

    private isUploadFileFinished = new BehaviorSubject<boolean>(false);
    public isUploadFileFinished$ = this.isUploadFileFinished.asObservable();

    setCourseItem(value) {
        this.courseItem.next(value);
    }

    setIsMobileItem(value: boolean) {
        this.isMobileItem.next(value);
    }

    setIsUploadFileFinished(value: boolean) {
        this.isUploadFileFinished.next(value);
    }

    setUserItem(value: INYCUUser) {
        this.userItem.next(value);
    }
}