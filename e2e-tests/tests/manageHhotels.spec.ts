import { expect ,test } from "@playwright/test";
import path from "path";


test.beforeEach(async({page})=>{
    const URL = "http://localhost:5173/";
    await page.goto(URL)
    await page.getByRole('button',{name:'Login'}).click()
    await expect( page.getByRole('heading',{name:'Welcome back'})).toBeVisible()
    await page.locator("[name=email]").fill('wdfdf.bazber1@gmail.com')
    await page.locator("[name=password]").fill('wdfdf.bazber1@gmail.com')
    await page.getByRole('button',{name:'Sign In'}).click()
    await expect( page.getByText('logged in succussfully')).toBeVisible()
    await expect( page.getByRole('link',{name:'BOOKINGS'})).toBeVisible()
    await expect( page.getByRole('link',{name:'HOTELS'})).toBeVisible()
    await expect( page.getByRole('button',{name:'Log Out'})).toBeVisible()

})


test('should be able to add hotel ', async({page}) => { 
    await page.goto(`http://localhost:5173/addHotels`)
    await page.locator('[name=name]').fill('test name')
    await page.locator('[name=city]').fill('test city')
    await page.locator('[name=country]').fill('test country')
    await page.locator('[name=description]').fill('Need to spend holidays in the countryside? Want to escape into nature away from the stress of the city and recharge your batteries? We will make available to you, for rent, this countr')
    await page.locator('[name=pricePerNight]').fill("4")
    await page.selectOption('select[name=starRating]',"4")
    await page.getByText('Resort').click()
    await page.getByRole('checkbox',{name:'Gym'}).click()
    await page.locator('[name=adultCount]').fill("4")
    await page.locator('[name=childCount]').fill("4")
    await page.setInputFiles('[name=imageFiles]',[
                path.join(__dirname,'files','3.png'),
                path.join(__dirname,'files','7.png')
                ])
    await page.getByRole('button',{name:"Save"}).click()
 })



 test('shoud display hotels',async ({page})=>{
    await page.goto(`http://localhost:5173/myHotels`)
    await expect(page.getByRole('heading',{name:'Hotels'})).toBeVisible()
    await expect(page.getByRole('button',{name:'Create Hotel'})).toBeVisible()
    await expect(page.getByText("est description test description")).toBeVisible()
    await expect(page.getByText('test country')).toBeVisible()
    await expect(page.getByText('test city')).toBeVisible()
    await expect(page.getByText('Budget')).toBeVisible()
    await expect(page.getByText('$409')).toBeVisible()

    // await page.getByRole('link',{name:"Create"})

 })



 test('should edit hotel ', async ({page}) => { 
    await page.goto(`http://localhost:5173/myHotels`)
    await expect( page.getByRole('heading',{name:"Hotels"})).toBeVisible()
    await page.getByRole('button',{name:"View Details"}).click()
    await page.getByRole('button',{name:"Edit Hotel"}).click()
    await page.waitForSelector('[name=name]', {state:'attached'})
    await  expect(page.locator('[name=name]')).toHaveValue('El Descansillo')
    await page.locator('[name=name]').fill('test name')
    await page.getByRole('button',{name:'Save'}).click()
  })


