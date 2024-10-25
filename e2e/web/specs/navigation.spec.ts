import { LearnPage } from "./../page/learn.page";
import { HomePage } from "./../page/home.page";
import { test } from "../fixture";
import { HeaderComponent } from "../components/header.component";
import { PlayPage } from "./../page/play.page";
import { StatisticsPage } from "../page/statistics.page";
import { ProfilePage } from "../page/profile.page";
import { ContactPage } from "../page/contact.page";
import { AboutUsPage } from "../page/aboutus.page";

test.describe("home page", () => {
  test("start lessons button", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.startLessons.click();
    const learnPage = new LearnPage(page);
    await learnPage.learnPageIsRendered();
  });

  // test("start drills button", async ({ page }) => {
  //   const homePage = new HomePage(page);
  //   await homePage.startDrills.click();
  //   const drillPage = new DrillPage(page);
  //   await drillPage.drillPageIsRendered();
  // });

  test("play sudoku button", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.playSudoku.click();
    const playPage = new PlayPage(page);
    await playPage.playPageIsRendered();
  });

  test("header renders correctly", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.headerRendersCorrectly();
  });

  test("statistics button", async ({ page }) => {
    const headerComponent = new HeaderComponent(page);
    await headerComponent.statistics.click();
    const statisticsPage = new StatisticsPage(page);
    await statisticsPage.statisticsPageIsRendered();
  });

  test("profile button", async ({ profile }) => {
    const profilePage = new ProfilePage(profile);
    await profilePage.profilePageIsRendered();
  });

  test("sidebar close button", async ({ page }) => {
    const headerComponent = new HeaderComponent(page);
    await headerComponent.drawer.click();
    await headerComponent.drawerClose.click();
    const homePage = new HomePage(page);
    await homePage.homePageIsRendered();
  });

  test("sidebar home button", async ({ page }) => {
    const headerComponent = new HeaderComponent(page);
    await headerComponent.drawer.click();
    await headerComponent.drawerHome.click();
    const homePage = new HomePage(page);
    await homePage.homePageIsRendered();
  });

  test("sidebar learn button", async ({ page }) => {});

  test("sidebar drill button", async ({ page }) => {});

  test("sidebar play button", async ({ page }) => {});

  test("sidebar contact button", async ({ page }) => {
    const headerComponent = new HeaderComponent(page);
    await headerComponent.drawer.click();
    await headerComponent.drawerContact.click();
    const contactPage = new ContactPage(page);
    await contactPage.contactPageIsRendered();
  });

  test("sidebar about us button", async ({ page }) => {
    const headerComponent = new HeaderComponent(page);
    await headerComponent.drawer.click();
    await headerComponent.drawerAboutUs.click();
    const aboutUsPage = new AboutUsPage(page);
    await aboutUsPage.aboutUsPageIsRendered();
  });
});
