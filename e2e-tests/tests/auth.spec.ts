import { test, expect } from '@playwright/test';

test('should allow user to login ', async({page}) => { 
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


 test('should allow user to sign up ', async({page}) => { 
    const URL = "http://localhost:5173/"
    const RandomEmail = `mohamed_${Math.floor((Math.random() * 90000) - 10000)}@gmail.com`
    await page.goto(URL)
    await page.getByRole('button',{name:'Sign Up'}).click()
    await expect(page.getByRole('heading',{name:'Welcome please sign up to have access'})).toBeVisible()
    await page.locator("[name=firstname]").fill('testname')
    await page.locator('[name=lastname]').fill('testname')
    await page.locator('[name=email]').fill(RandomEmail)
    await page.locator('[name=password]').fill('password123')
    await page.locator('[name=confirmPassword]').fill('password123')
    await page.getByRole('button',{name:'Create account'}).click()


    await expect( page.getByText('user added succussfully')).toBeVisible()
    await expect( page.getByRole('link',{name:'BOOKINGS'})).toBeVisible()
    await expect( page.getByRole('link',{name:'HOTELS'})).toBeVisible()
    await expect( page.getByRole('button',{name:'Log Out'})).toBeVisible()
  })