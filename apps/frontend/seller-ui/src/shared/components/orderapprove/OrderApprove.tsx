import React from 'react'
import Product from '../../../assets/productimage.png'
import Image from 'next/image'
import './orderapprove.css'
const OrderApprove = () => {
  return (
    <div>
        <div className="productapprove">
            <div className="orderapprove-top">
                <div className="productimage">
                    <Image src={Product} alt="productimage" />
                </div>
                <div className="productinfo">
                    <h2 className='product-title'>Ambrane Unbreakable 60W</h2>
                    <p className='paracontent'>live inventory-13</p>
                </div>
            </div>
            <div className="productmiddle">
                <table className='tabel-stylings'>
                    <tbody>
                        <tr>
                            <td>
                                Qnty
                            </td>
                            <td>Total Price</td>
                            <td>City</td>
                            <td>Payment Mode</td>
                        </tr>
                        <tr>
                            <td>
                                1
                            </td>
                            <td>$1234</td>
                            <td>Pune</td>
                            <td>UPI payment</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="approvebuttons">
                <button className='center-borderedbutton '>Cancel</button>
                <button className='background-buttonver '>Approve</button>
            </div>
        </div>
    </div>
  )
}

export default OrderApprove