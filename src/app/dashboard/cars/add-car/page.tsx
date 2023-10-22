// 'use client';
// import { getBrands, getModels } from '@/utils/branch';

// import React, { useState } from 'react';
// export default async function AddCar() {
//     const brands_data = await getBrands();
//     const [models, setModels] = useState([]);
//     const [licensePlates, setLicensePlates] = useState('');
//     const [automakerId, setAutomakerId] = useState('');
//     const [carNameId, setCarNameId] = useState('10');
//     const selectBrand = async (value: number) => {
//         try {
//             setAutomakerId(value.toString());
//             setCarNameId('');
//             const dong_xe = await getModels(value);
//             if(dong_xe){
//                 setModels(dong_xe);
//             }
//         } catch (error) {}
//     };
//     return (
//         <main className="main">
//             <div className="user-profile pt-40 pb-40">
//                 <div className="container">
//                 <div className="row">
//                 <div className="col col-md-4">
//                     <div className="form-group">
//                         <label>Biển số xe</label>
//                         <input
//                             type="text"
//                             name="license_plates"
//                             className="form-control"
//                             placeholder="Biển số xe"
//                             value={licensePlates}
//                             onChange={(e) => setLicensePlates(e.target.value)}
//                         />
//                     </div>
//                 </div>
//                 <div className="col col-md-4">
//                     <div className="form-group">
//                         <label>Hãng xe</label>

//                         <select
//                             className="form-control"
//                             required
//                             name="automaker_id"
//                             id="automaker_id"
//                             onChange={selectBrand}
//                         >
//                             <option>Chọn hãng xe</option>

//                             {brands_data && brands_data?.map((brand) => (
//                                 <option value={brand.id}>
//                                     {brand.name}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                 </div>
//                 <div className="col col-md-4">
//                     <div className="form-group">
//                         <label>Dòng xe</label>
//                         <select
//                             type="text"
//                             className="form-control"
//                             placeholder="Dòng xe"
//                             name="car_name_id"
//                             required
//                             onChange={(e) => setCarNameId(e.target.value)}
//                         >
//                             <option>Chọn dòng xe</option>
//                             {models.map((model) => (
//                                 <option key={model.id} value={model.id}>
//                                     {model.name}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                 </div>
//             </div>
//                 </div>
//             </div>
//             {/* <!-- user-profile end --> */}
//         </main>
//     );
// }
