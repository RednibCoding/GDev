using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace Editor
{
	/// <summary>
	/// Interaktionslogik für Win_Settings.xaml
	/// </summary>
	public partial class Win_Settings:Window
	{

		public Win_Settings()
		{
			WindowStartupLocation=System.Windows.WindowStartupLocation.CenterScreen;
			InitializeComponent();
			// Fill text boxes with previously saved settings
			txtbxAppTitle.Text=Settings.AppTitle;
			txtbxAppWidth.Text=Settings.AppWidth.ToString();
			txtbxAppHeight.Text=Settings.AppHeight.ToString();
		}

		public void SetAppSettingsFromSettingsDialog()
		{
			// App title
			Settings.AppTitle=txtbxAppTitle.Text;
			Settings.AppTitle=Regex.Replace(Settings.AppTitle, @"\s+", "_");
			int w = 0;
			int h = 0;

			// App resolution
			if (!Int32.TryParse(txtbxAppWidth.Text, out w))
				w=800;
			Settings.AppWidth=w;
			if (!Int32.TryParse(txtbxAppHeight.Text, out h))
				h=600;
			Settings.AppHeight=h;
		}

		private void BtnSettingsConfirm_Click(object sender, RoutedEventArgs e)
		{
			SetAppSettingsFromSettingsDialog();
			this.Close();
		}

		private void BtnSettingsCancel_Click(object sender, RoutedEventArgs e)
		{
			this.Close();
		}
	}
}
