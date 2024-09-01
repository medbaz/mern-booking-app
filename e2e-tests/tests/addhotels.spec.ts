import { expect ,test } from "@playwright/test";
import path from "path";

test.beforeEach(async({page})=>{
    const URL = "http://localhost:5173/";
    await page.goto(URL)
    await page.getByRole('button',{name:'Login'}).click()
    await expect( page.getByRole('heading',{name:'Welcome back'})).toBeVisible()
    await page.locator("[name=email]").fill('mohamed.bazber1@gmail.com')
    await page.locator("[name=password]").fill('mohamed.bazber1@gmail.com')
    await page.getByRole('button',{name:'Sign In'}).click()
    await expect( page.getByText('logged in succussfully')).toBeVisible()
    await expect( page.getByRole('link',{name:'BOOKINGS'})).toBeVisible()
    await expect( page.getByRole('link',{name:'HOTELS'})).toBeVisible()
    await expect( page.getByRole('button',{name:'Log Out'})).toBeVisible()


})

test('should be able to add hotel ', async({page}) => { 
    await page.goto('http://localhost:5173/myHotels')
    await page.locator('[name=name]').fill('test name')
    await page.locator('[name=city]').fill('test city')
    await page.locator('[name=country]').fill('test country')
    await page.locator('[name=description]').fill('this is the test text in order to test the description field')
    await page.locator('[name=pricePerNight]').fill("4")
    await page.selectOption('select[name=starRating]',"4")
    await page.getByText('Resort').click()
    await page.getByRole('checkbox',{name:'Gym'}).click()
    await page.locator('[name=adultCount]').fill("2")
    await page.locator('[name=childCount]').fill("2")
    await page.setInputFiles('[name=imageFiles]',[
                path.join(__dirname,'files','1.png'),
                path.join(__dirname,'files','2.png')
                ])
    await page.getByRole('button',{name:"Save"}).click()
 })