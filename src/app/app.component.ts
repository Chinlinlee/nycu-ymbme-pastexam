import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SeoService } from 'src/services/seo.service';
import * as _ from 'lodash';
import { SharedService } from '../services/shared.service';
import { ICourse } from './models/course.model';
import { Location } from '@angular/common';
import { MenuController, ModalController, NavController } from '@ionic/angular';
import { UploadModalComponent } from './upload-modal/upload-modal.component';


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    MY_GRADE_TYPE = {
        "1": {
            name: "大一",
            isOpen: false,
            data:[]
        },
        "2": {
            name: "大二",
            isOpen: false,
            data:[]
        },
        "3": {
            name: "大三",
            isOpen: false,
            data:[]
        },
        "4": {
            name: "大四",
            isOpen: false,
            data:[]
        },
        "5": {
            name: "碩一",
            isOpen: false,
            data:[]
        },
        "6": {
            name: "碩二",
            isOpen: false,
            data:[]
        }
    };
    perviousOpen:string;
    perviousCourseId: number;
    disableSplitPane: boolean = false;
    sideMenuSide: string;
    isMobile: boolean = false;
    routePathDescription = {
        "/home": {
            title: "YMBME考古題&筆記",
            description: "提供陽明醫工系上傳、參考考古題以及筆記的系統"
        },
        "oauth/callback": {
            title: "YMBME考古題&筆記 | OAuth",
            description: "陽明醫工考古題OAuth登入頁面"
        },
        "/pastexam": {
            title: "YMBME考古題&筆記 | 主頁面",
            description: "提供陽明醫工系上傳、參考考古題以及筆記的系統"
        }
    }
    constructor(
        private router: Router,
        private activateRoute: ActivatedRoute,
        private seoService: SeoService,
        private sharedService: SharedService,
        private cdr: ChangeDetectorRef,
        private location: Location,
        private navController: NavController,
        private menuController: MenuController,
        private modalController: ModalController
    ) {
        this.router.events.pipe(
            filter((e) => e instanceof NavigationEnd)
        )
        .subscribe((e: NavigationEnd) => {
            if (e.url != "/" && e.url != "/home" ) {
                this.menuController.enable(true, "menu-content");
            }
            if (_.get(this.routePathDescription, e.url, false)) {
                this.seoService.updateTitle(this.routePathDescription[e.url].title);
                this.seoService.updateDescription(this.routePathDescription[e.url].description);
            }
        });
        this.sharedService.isMobileItem$.subscribe({
            next: (isMobile) => {
                this.isMobile = isMobile;
            },
            error: (err) => {
                console.error(err);
            }
        })
        if (window.innerWidth >= 960) {
            this.sharedService.setIsMobileItem(false);
        } else {
            this.sharedService.setIsMobileItem(true);
        }
    }
    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.sharedService.courseItem$.subscribe(
            (data) => {
                if (_.isArray(data)) {
                    for (let index in this.MY_GRADE_TYPE) {
                       this.MY_GRADE_TYPE[index].data = (data as Array<ICourse>).filter(v=> v.gradeType == Number(index));
                    }
                }
                let url = this.router.url;
                if (url.includes("/pastexam")) {
                    let urlSplit = url.split("/");
                    if (urlSplit.length == 3) {
                        let courseId = urlSplit[2];
                        for (let index in this.MY_GRADE_TYPE) {
                            let foundData = this.MY_GRADE_TYPE[index].data.find(v=> v.courseId == courseId);
                            if (foundData) {
                                this.MY_GRADE_TYPE[index].isOpen = true;
                            }
                        }
                    }
                }
            }
        );
    }

    onSideMenuItemClick (key:string) {
        if (this.perviousOpen == key) {
            this.MY_GRADE_TYPE[key].isOpen = !this.MY_GRADE_TYPE[key].isOpen;
        } else {
            this.perviousOpen = key;
            for(let index in this.MY_GRADE_TYPE) {
                let gradeType = this.MY_GRADE_TYPE[index];
                gradeType.isOpen = false;
            }
            this.MY_GRADE_TYPE[key].isOpen = !this.MY_GRADE_TYPE[key].isOpen;
        }
    }

    classSideMenuOpenIcon(key: string) {
        if (this.MY_GRADE_TYPE[key].isOpen) {
            return "opened-caret-outline";
        }
        return "un-open-caret-outline";
    }


    onResize(event) {
        let innerWidth = event.target.innerWidth;
        if (innerWidth >= 960) {
            this.isMobile = false;
            this.sharedService.setIsMobileItem(false);
            this.menuController.swipeGesture(false, "menu-content");
        } else {
            this.isMobile = true;
            this.sharedService.setIsMobileItem(true);
            this.menuController.swipeGesture(true, "menu-content");
        }
    }

    async closeMenu() {
        await this.menuController.close("menu-content");
    }
   
}
