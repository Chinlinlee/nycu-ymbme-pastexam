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

    private isUploadFileChanged = new BehaviorSubject<boolean>(false);
    public isUploadFileChanged$ = this.isUploadFileChanged.asObservable();

    setCourseItem(value) {
        this.courseItem.next(value);
    }

    setIsMobileItem(value: boolean) {
        this.isMobileItem.next(value);
    }

    setIsUploadFileChanged(value: boolean) {
        this.isUploadFileChanged.next(value);
    }

    setUserItem(value: INYCUUser) {
        this.userItem.next(value);
    }
}