"use client";

import React from "react";
import { Printer, ArrowLeft } from "lucide-react";
import Link from "next/link";

// Simple currency formatter in case utils is missing
const formatIDR = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export default function InvoicePage() {
  const invoiceNumber = "INV/TKABA8/2026/10";
  const invoiceDate = "12 Oktober 2026";
  const dueDate = "17 Oktober 2026";
  const expiryDate = "12 Oktober 2027";
  const totalAmount = 400000;

  return (
    <div className="min-h-screen bg-canvas-press py-8 print:py-0 print:bg-white font-body text-navy">
      {/* Non-printable Action Bar */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center print:hidden px-4 md:px-0">
        <Link
          href="/"
          className="flex items-center gap-2 text-navy-mid hover:text-navy transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Kembali ke Portofolio
        </Link>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-navy text-white px-4 py-2 rounded-md hover:bg-navy-mid transition-colors text-sm font-medium shadow-sm"
        >
          <Printer size={16} />
          Cetak / Unduh PDF
        </button>
      </div>

      {/* Invoice A4 Container */}
      <div className="max-w-[210mm] min-h-[297mm] mx-auto bg-white shadow-xl print:shadow-none p-8 md:p-12 border border-hairline-cloud print:border-none rounded-xl print:rounded-none">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-hairline-cloud pb-8 mb-8">
          <div>
            <h1 className="text-4xl font-display font-bold tracking-tight text-navy mb-2">
              INVOICE
            </h1>
            <p className="text-sm text-navy-mid">No: {invoiceNumber}</p>
            <p className="text-sm text-navy-mid">Tanggal: {invoiceDate}</p>
            <p className="text-sm text-navy-mid font-bold mt-1">
              Jatuh Tempo: {dueDate}
            </p>
          </div>
          <div className="mt-6 md:mt-0 text-left md:text-right">
            <h2 className="text-lg font-bold text-navy">Aan Anjar Setyowati</h2>
            <p className="text-sm text-navy-mid">Web Developer</p>
            <p className="text-sm text-navy-mid mt-1">aanjardev@gmail.com</p>
          </div>
        </div>

        {/* Bill To */}
        <div className="mb-10">
          <h3 className="text-sm font-bold text-navy uppercase tracking-wider mb-2">
            Ditagihkan Kepada:
          </h3>
          <div className="bg-canvas-press print:bg-transparent print:border border-hairline-cloud rounded-lg p-4">
            <h4 className="text-base font-bold text-navy">
              Ibu Raihatul Jannah (0857-9121-8812)
            </h4>
            <p className="text-sm text-navy-mid mt-0.5">
              Guru - TK ABA 8 Kepanjen
            </p>
            <p className="text-xs text-navy-mid mt-1">
              Jl. Effendi 103, Kepanjen, Malang
            </p>
          </div>
        </div>

        {/* Invoice Table */}
        <div className="mb-10 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-navy text-navy text-sm">
                <th className="py-3 px-2 w-[5%] font-bold">No</th>
                <th className="py-3 px-2 w-[65%] font-bold">
                  Deskripsi Layanan
                </th>
                <th className="py-3 px-2 w-[30%] text-right font-bold">
                  Jumlah
                </th>
              </tr>
            </thead>
            <tbody className="text-sm text-navy-mid">
              <tr className="border-b border-hairline-cloud">
                <td className="py-4 px-2 align-top">1</td>
                <td className="py-4 px-2">
                  <span className="block font-medium text-navy">
                    Registrasi / Pembelian Domain tkaba8kepanjen.sch.id
                  </span>
                  <span className="block text-xs mt-1 text-gray-500">
                    *Durasi: 1 Tahun (Aktif s.d. {expiryDate}) <br />
                    *Konfigurasi DNS & Integrasi Server <br />
                  </span>
                </td>
                <td className="py-4 px-2 text-right align-top font-medium text-navy">
                  {formatIDR(totalAmount)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="flex flex-col md:flex-row justify-between mb-12">
          {/* Notes */}
          <div className="w-full md:w-1/2 mb-6 md:mb-0 pr-0 md:pr-8">
            <h3 className="text-sm font-bold text-navy uppercase tracking-wider mb-2">
              Catatan:
            </h3>
            <ul className="text-sm text-navy-mid list-disc list-outside pl-4 space-y-1.5">
              <li>
                Pembayaran penuh (Full Payment) untuk pendaftaran nama domain selama 1 (satu) tahun.
              </li>
              <li>
                Masa aktif domain berlaku hingga tanggal <strong>{expiryDate}</strong>.
              </li>
              <li>
                Mohon untuk melakukan transfer selambat-lambatnya pada
                tanggal <strong>{dueDate}</strong>.
              </li>
              <li>
                Harap melakukan konfirmasi via WhatsApp setelah melakukan
                pembayaran.
              </li>
            </ul>
          </div>

          {/* Totals */}
          <div className="w-full md:w-5/12 bg-canvas-press print:bg-transparent rounded-lg p-5 border border-transparent print:border-hairline-cloud">
            <div className="flex justify-between items-center mb-3 text-sm">
              <span className="text-navy-mid">Subtotal</span>
              <span className="font-bold text-navy">
                {formatIDR(totalAmount)}
              </span>
            </div>
            <div className="w-full h-px bg-hairline-cloud my-3"></div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-navy">
                Total Tagihan
              </span>
              <span className="font-bold text-navy text-lg">
                {formatIDR(totalAmount)}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div className="border-t border-hairline-cloud pt-8">
          <h3 className="text-sm font-bold text-navy uppercase tracking-wider mb-4">
            Informasi Pembayaran (Transfer Bank):
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* BCA */}
            <div className="border border-hairline-cloud rounded-lg p-4 flex items-start gap-4">
              <div className="w-12 h-12 bg-[#0066AE] rounded flex items-center justify-center text-white font-bold shrink-0">
                BCA
              </div>
              <div>
                <h4 className="font-bold text-navy text-sm mb-1">
                  Bank Central Asia (BCA)
                </h4>
                <p className="font-mono text-base text-navy-mid font-medium tracking-wide">
                  3151827525
                </p>
                <p className="text-xs text-navy-mid mt-1">
                  A.N. Aan Anjar Setyowati
                </p>
              </div>
            </div>

            {/* BNI */}
            <div className="border border-hairline-cloud rounded-lg p-4 flex items-start gap-4">
              <div className="w-12 h-12 bg-[#F15A23] rounded flex items-center justify-center text-white font-bold shrink-0">
                BNI
              </div>
              <div>
                <h4 className="font-bold text-navy text-sm mb-1">
                  Bank Negara Indonesia (BNI)
                </h4>
                <p className="font-mono text-base text-navy-mid font-medium tracking-wide">
                  1890272824
                </p>
                <p className="text-xs text-navy-mid mt-1">
                  A.N. Aan Anjar Setyowati
                </p>
              </div>
            </div>
          </div>
          <p className="text-xs text-center text-navy-mid mt-12 print:mt-16">
            Terima kasih atas kepercayaannya. Harap simpan bukti transfer untuk
            konfirmasi.
          </p>
        </div>
      </div>
    </div>
  );
}
